import { isGenerateImageModel } from '@renderer/config/models'
import { Assistant, Model } from '@renderer/types'
import { Tooltip } from 'antd'
import { Image } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  assistant: Assistant
  model: Model
  mentionModels: Model[]
  ToolbarButton: any
  onEnableGenerateImage: () => void
}

const GenerateImageButton: FC<Props> = ({ model, mentionModels, ToolbarButton, assistant, onEnableGenerateImage }) => {
  const { t } = useTranslation()

  const supportGenerateImage = isGenerateImageModel(model) || mentionModels.some(isGenerateImageModel)

  return (
    <Tooltip
      placement="top"
      title={supportGenerateImage ? t('chat.input.generate_image') : t('chat.input.generate_image_not_supported')}
      arrow>
      <ToolbarButton type="text" disabled={!supportGenerateImage} onClick={onEnableGenerateImage}>
        <Image size={18} color={assistant.enableGenerateImage ? 'var(--color-link)' : 'var(--color-icon)'} />
      </ToolbarButton>
    </Tooltip>
  )
}

export default GenerateImageButton
