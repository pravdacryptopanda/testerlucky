// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
    func: T,
    delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let lastPromise: Promise<ReturnType<T>> | null = null;

    return function(...args: Parameters<T>): Promise<ReturnType<T>> {
        if (timerId) {
            clearTimeout(timerId);
        }

        lastPromise = new Promise((resolve, reject) => {
            timerId = setTimeout(() => {
                func(...args)
                    .then(resolve)
                    .catch(reject);
            }, delay);
        });

        return lastPromise;
    };
}
