import { useEffect } from 'react';

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClose: (value: boolean) => void
) {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [ref, onClose]);
}
