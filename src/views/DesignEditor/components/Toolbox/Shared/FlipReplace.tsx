import React, { useRef, useState, useEffect } from "react";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { Block } from "baseui/block";
import { Button, SIZE, KIND } from "baseui/button";
import { PLACEMENT, StatefulPopover } from "baseui/popover";
import { StatefulTooltip } from "baseui/tooltip";
import FlipHorizontal from "~/components/Icons/FlipHorizontal";
import FlipVertical from "~/components/Icons/FlipVertical";
import ReplaceImageIcon from "~/components/Icons/Images";

export default function ImageEditor() {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [state, setState] = React.useState({ flipX: false, flipY: false });

  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      });
    }
  }, [activeObject]);

  

  const flipHorizontally = () => {
    if (activeObject) {
      const newValue = !activeObject.flipX;
      editor.objects.update({ flipX: newValue });
      setState({ ...state, flipX: newValue });
    }
  };

  const flipVertically = () => {
    if (activeObject) {
      const newValue = !activeObject.flipY;
      editor.objects.update({ flipY: newValue });
      setState({ ...state, flipY: newValue });
    }
  };

  const handleReplaceClick = () => {
    // Trigger the file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        if (activeObject) {
          console.log("Before image replacement:", activeObject);
          activeObject.setSrc(dataUrl, (img: fabric.Image) => {
            editor.canvas.requestRenderAll(); // Manually trigger a re-render of the canvas
          });
          console.log("After image replacement:", activeObject);
          setImageUrl(dataUrl); // Update the state with the new dataUrl
          
        }
      };
      reader.readAsDataURL(files[0]);
      e.target.value = "";
    }
  };

  {imageUrl && <img src={imageUrl} alt=" " />}

  return (


    <Block display="flex" alignItems="center">
      <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Vend billede">
        <Block marginRight="scale500">
          <StatefulPopover
            placement={PLACEMENT.bottom}
            content={() => (
              <Block width={"180px"} padding={"12px"} backgroundColor={"#ffffff"}>
                <Button
                  $style={{ width: "100%", justifyContent: "flex-start" }}
                  startEnhancer={<FlipHorizontal size={24} />}
                  onClick={flipHorizontally}
                  kind={KIND.tertiary}
                  size={SIZE.mini}
                >
                  Flip Vandret
                </Button>
                <Button
                  $style={{ width: "100%", justifyContent: "flex-start" }}
                  startEnhancer={<FlipVertical size={24} />}
                  onClick={flipVertically}
                  kind={KIND.tertiary}
                  size={SIZE.mini}
                >
                  Flip Lodret
                </Button>
              </Block>
            )}
          >
            <Button size={SIZE.compact} kind={KIND.tertiary}>Flip</Button>
          </StatefulPopover>
        </Block>
      </StatefulTooltip>

      <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Erstat billede">
        <Button
          size={SIZE.compact}
          kind={KIND.tertiary}
          startEnhancer={<ReplaceImageIcon size={24} />}
          onClick={handleReplaceClick}
        >
          Erstat
        </Button>
      </StatefulTooltip>


      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
    </Block>
  );
}