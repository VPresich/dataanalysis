import LinesEllipsis from "react-lines-ellipsis";

const EllipsisText = ({ text, maxLines = 1, className }) => {
  return (
    <LinesEllipsis
      text={text}
      maxLine={maxLines}
      ellipsis="..."
      trimRight
      basedOn="letters"
      component="p"
      className={className}
    />
  );
};

export default EllipsisText;
