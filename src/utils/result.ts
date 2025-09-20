export type Ok<T> = { ok: true; value: T };
export type Err<E extends Error = Error> = { ok: false; error: E };
export type Result<T, E extends Error = Error> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E extends Error>(error: E): Err<E> => ({ ok: false, error });

export async function wrap<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const value = await promise;
    return ok(value);
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return err(error);
  }
}


