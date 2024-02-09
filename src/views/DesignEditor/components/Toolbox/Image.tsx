import { Block } from "baseui/block"
import Common from "./Common"
import Flip from "./Shared/Flip"
import Replace from "./Shared/Replace"

export default function () {
  return (
    <Block
      $style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "space-between",
      }}
    >
      <Block>
        <Flip />
      </Block>
      <Common />
    </Block>
  )
}
