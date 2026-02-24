import type { Plugin } from "@opencode-ai/plugin"

const pendingApproveBySession = new Map<string, string>()

function buildWorkCommand(rawArguments: string): string {
  const trimmed = rawArguments.trim()
  return trimmed.length > 0 ? `sbs-work ${trimmed}` : "sbs-work"
}

export const SbsChainPlugin: Plugin = async ({ client, directory }) => {
  return {
    event: async ({ event }) => {
      await client.app.log({
        query: { directory },
        body: {
          service: "sbs-chain",
          level: "info",
          message: "Received event",
          extra: { eventType: event.type, eventProperties: event.properties }
        },
      })

      if (event.type === "command.executed") {
        const name = event.properties?.name
        const sessionID = event.properties?.sessionID
        const rawArguments = event.properties?.arguments ?? ""

        if (name === "sbs-approve" && typeof sessionID === "string" && sessionID.length > 0) {
          pendingApproveBySession.set(sessionID, buildWorkCommand(rawArguments))
        }

        return
      }

      if (event.type !== "session.idle") {
        return
      }

      const sessionID = event.properties?.sessionID
      if (typeof sessionID !== "string" || sessionID.length === 0) {
        return
      }

      const commandToRun = pendingApproveBySession.get(sessionID)
      if (!commandToRun) {
        return
      }

      pendingApproveBySession.delete(sessionID)

      try {
        const [command, ...rest] = commandToRun.split(" ")
        const argumentsText = rest.join(" ").trim()

        await client.session.command({
          path: { id: sessionID },
          query: { directory },
          body: {
            command,
            arguments: argumentsText,
          },
        })

        await client.tui.showToast({
          query: { directory },
          body: {
            title: "SBS",
            message: `/${commandToRun} 자동 실행`,
            variant: "info",
            duration: 2000,
          },
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)

        await client.app.log({
          query: { directory },
          body: {
            service: "sbs-chain",
            level: "warn",
            message: "Failed to dispatch /sbs-work after /sbs-approve",
            extra: { sessionID, commandToRun, error: message },
          },
        })

        await client.tui.showToast({
          query: { directory },
          body: {
            title: "SBS",
            message: "자동 /sbs-work 실행 실패. 수동으로 실행해 주세요.",
            variant: "warning",
            duration: 3500,
          },
        })
      }
    },
  }
}
