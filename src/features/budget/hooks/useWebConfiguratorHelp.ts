type HelpTopic = "pages" | "languages" | null

type TopicText = {
  plural: string
  singular: string
  articlePlural: string
}

const getTopicText = (topic: HelpTopic): TopicText | null => {
  if (topic === "pages") {
    return { plural: "páginas", singular: "página", articlePlural: "las" }
  }

  if (topic === "languages") {
    return { plural: "lenguajes", singular: "lenguaje", articlePlural: "los" }
  }

  return null
}

export const useWebConfiguratorHelp = (
  topic: HelpTopic,
  setTopic: (nextTopic: HelpTopic) => void,
) => {
  const openHelp = (nextTopic: Exclude<HelpTopic, null>) => () => setTopic(nextTopic)
  const closeHelp = () => setTopic(null)
  const topicInfo = getTopicText(topic)
  const modalTitle = topicInfo ? `Número de ${topicInfo.plural}` : undefined

  return {
    topicInfo,
    openHelp,
    closeHelp,
    modalTitle,
  }
}