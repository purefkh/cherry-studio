import { isAnthropicModel, isGeminiModel, isPureGenerateImageModel } from '@renderer/config/models'
import { defineTool, registerTool, TopicType } from '@renderer/pages/home/Inputbar/types'
import { getProviderByModel } from '@renderer/services/AssistantService'
import type { Model } from '@renderer/types'
import { isSupportUrlContextProvider } from '@renderer/utils/provider'

import UrlContextButton from './components/UrlContextbutton'

const urlContextTool = defineTool({
  key: 'url_context',
  label: (t) => t('chat.input.url_context'),
  visibleInScopes: [TopicType.Chat],
  condition: ({ model, mentionedModels = [] }) => {
      const checkModel = (modelToCheck: Model) => {
        const provider = getProviderByModel(modelToCheck)
        return !!provider && isSupportUrlContextProvider(provider) && !isPureGenerateImageModel(modelToCheck) && (isGeminiModel(modelToCheck) || isAnthropicModel(modelToCheck))
      }

      return checkModel(model) || mentionedModels.some(checkModel)
    },
  render: ({ assistant }) => <UrlContextButton assistantId={assistant.id} />
})

registerTool(urlContextTool)

export default urlContextTool
