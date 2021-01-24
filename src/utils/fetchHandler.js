import AlertMessage from 'glud-component/lib/AlertMessage'
import Toastify from 'glud-component/lib/Toastify'

export default async ({
  loadingMessage,
  successMessage,
  callAction,
  onError,
  onFinally
}) => {
  let loading = null

  try {
    if (!callAction) return

    if (loadingMessage) {
      loading = Toastify({
        type: 'LOADING',
        message: loadingMessage
      })

      await callAction()

      loading.close()
      loading = null
    }

    if (!loadingMessage) {
      await callAction()
    }

    if (successMessage) {
      Toastify({
        type: 'SUCCESS',
        closeTime: 2,
        message: successMessage
      })
    }
  } catch (error) {
    if (onError) onError()
    if (error.type) {
      AlertMessage.open(error)
    } else {
      AlertMessage.open({
        type: 'ERROR',
        message: error.message
      })
      console.error(error)
    }
  } finally {
    if (loading) loading.close()
    if (onFinally) onFinally()
  }
}
