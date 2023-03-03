import { useRef, useEffect } from 'react'

function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useDocumentTitle
