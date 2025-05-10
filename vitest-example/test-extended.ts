import {test as testBase} from 'vitest'

import { setupWorker } from 'msw/browser'

const worker = setupWorker()

type TestContext = {
  worker: typeof worker
}

export const test = testBase.extend<TestContext>({
  worker: [
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