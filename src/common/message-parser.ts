import { jsonrepair } from 'jsonrepair';
import type { JsonObject } from 'type-fest';

export class MessageParser {
    static toJSONObject(message: string): JsonObject[] {
        try {
            const parsed = JSON.parse(message);
            return [parsed];
        } catch {
            return this.repairAndParseJson(message);
        }
    }

    private static repairAndParseJson(message: string): JsonObject[] {
        const repairedMessage = jsonrepair(message);
        const repairedJson = JSON.parse(repairedMessage);

        const repaired: JsonObject[] = [];
        if (typeof repairedJson === 'object') {
            repaired.push(repairedJson);
            return repaired;
        }

        if (Array.isArray(repairedJson)) {
            for (const item of repairedJson) {
                if (typeof item === 'object') repaired.push(item);
            }
            return repaired;
        }
        return [];
    }
}
