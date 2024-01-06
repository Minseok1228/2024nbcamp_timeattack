type Props = {
  y: number;
};
export default function Spacer({ y }: Props) {
  return (
    <div
      style={{
        height: `${y}px`,
      }}
    ></div>
  );
}
