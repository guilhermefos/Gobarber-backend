import { string } from "@hapi/joi"

export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>;
    recovery<T>(Key: string): Promise<T | null>;
    invalidate(key: string): Promise<void>;
    invalidatePrefix(prefix: string): Promise<void>;
}
