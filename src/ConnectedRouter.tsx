import React, { useEffect, useRef } from 'react'
import { useStore } from 'react-redux'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { onLocationChanged } from './actions'
import locationFromUrl from './utils/locationFromUrl'
import { Structure, LocationState } from './types'

type ConnectedRouterProps = {
  children?: React.ReactNode;
  reducerKey?: string;
}

const createConnectedRouter = (structure: Structure): React.FC<ConnectedRouterProps> => {
  const { getIn } = structure

  /*
   * ConnectedRouter listens to Next Router events.
   * When history is changed, it dispatches an action
   * to update router state in redux store.
   */
  const ConnectedRouter: React.FC<ConnectedRouterProps> = props => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { reducerKey = 'router' } = props
    const store = useStore()
    const ongoingRouteChanges = useRef(0)
    const isTimeTravelEnabled = useRef(true)
    const inTimeTraveling = useRef(false)

    function trackRouteComplete(): void {
      isTimeTravelEnabled.current = --ongoingRouteChanges.current <= 0
    }

    function trackRouteStart(): void {
      isTimeTravelEnabled.current = ++ongoingRouteChanges.current <= 0
    }

    useEffect(() => {
      function listenStoreChanges(): void {
        /**
         * Next.js asynchronously loads routes, and Redux actions can be
         * dispatched during this process before Router's history change.
         * To prevent time travel changes during it, time travel detection
         * is disabled when Router change starts, and later enabled on change
         * completion or error.
         */
        if (!isTimeTravelEnabled.current) {
          return
        }

        const storeLocation = getIn(store.getState(), [reducerKey, 'location']) as LocationState
        const {
          pathname: pathnameInStore,
          search: searchInStore,
          hash: hashInStore,
        } = storeLocation
        // Extract Router's location
        const pathnameInHistory = pathname
        const searchInHistory = `?${searchParams}`
        const hashInHistory = ''
        // If we do time traveling, the location in store is changed but location in Router is not changed
        const locationMismatch =
          pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory

        if (locationMismatch) {
          const as = `${pathnameInStore}${searchInStore}${hashInStore}`
          // Update Router's location to match store's location
          inTimeTraveling.current = true
          router.replace(as)
        }
      }
      
      const unsubscribeStore = store.subscribe(listenStoreChanges)
      return unsubscribeStore
    }, [router, pathname, searchParams, store, reducerKey])

    useEffect(() => {
      function onRouteChangeFinish(url: string): void {
        // Dispatch onLocationChanged except when we're time traveling
        if (!inTimeTraveling.current) {
          const storeLocation = getIn(store.getState(), [reducerKey, 'location']) as LocationState

          if (url !== storeLocation.href) {
            store.dispatch(onLocationChanged(locationFromUrl(url)))
          }
        } else {
          inTimeTraveling.current = false
        }
        trackRouteComplete()
      }

      try {
        const url = pathname + '?' + searchParams.toString()
        trackRouteStart()
        onRouteChangeFinish(url)
      }catch(e) {
        trackRouteComplete()
      }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams,])

    return <>{props.children}</>
  }

  return ConnectedRouter
}

export default createConnectedRouter
