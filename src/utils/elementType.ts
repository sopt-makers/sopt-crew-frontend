export type ElementType<T> = T extends (infer U)[] ? U : T;
