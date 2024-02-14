import React, { useEffect } from "react"
import useEditorType from "~/hooks/useEditorType"
import SelectEditor from "./SelectEditor"
import GraphicEditor from "./GraphicEditor"
import PresentationEditor from "./PresentationEditor"
import VideoEditor from "./VideoEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { DesignType } from "~/interfaces/DesignEditor"

function DesignEditor() {
  const editorType = useEditorType()
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()
  const { setEditorType } = useDesignEditorContext()
  const [selectedEditor, setSelectedEditor] = React.useState<DesignType>("GRAPHIC")

  useEffect(() => {
    setEditorType("GRAPHIC"); // Set editor type to GRAPHIC when the component mounts
  }, []);

  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}

      {
        {
          NONE: <SelectEditor />,
          PRESENTATION: <PresentationEditor />,
          VIDEO: <VideoEditor />,
          GRAPHIC: <GraphicEditor />,
        }[editorType]
      }
    </>
  )
}

export default DesignEditor
