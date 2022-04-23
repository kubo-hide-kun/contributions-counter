import { useCallback, useState } from 'react';

export const useAsync = (
  asyncFn: () => Promise<void>,
): {
  isError: boolean;
  isLoading: boolean;
  invokeFn: VoidFunction;
} => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const invokeFn = useCallback(() => {
    const f = async () => {
      try {
        await asyncFn();
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error(error);
      }
    };
    setIsError(false);
    setIsLoading(true);
    f();
  }, [asyncFn]);

  return {
    isError,
    isLoading,
    invokeFn,
  };
};
