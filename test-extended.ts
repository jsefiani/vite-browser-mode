import {test as testBase} from 'vitest'

import { setupWorker } from 'msw/browser'

const worker = setupWorker()

type TestContext = {
  mockApi: typeof worker
}

export const test = testBase.extend<TestContext>({
  mockApi: [
    // When using _ to indicate that the parameter is not used, Vitest throws an error, so we are required to add an empty object
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      await worker.start({
        onUnhandledRequest: 'error',
        quiet: true,
      })
      await use(worker)
      worker.resetHandlers()
      worker.stop()
    },
    {
      auto: true,
    },
  ],
})