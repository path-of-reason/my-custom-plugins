export type DrawingObject = {
  name: string;
  coordinate: [number, number];
  width: number;
  height: number;
  rounded: string;
  opacity: number;
  lineWidth: number;
  lineDash: [number, number];
  rotation: number;
  lineColor: string;
  bgColor: string;
  text?: {
    content: string;
    fontSize: number;
    fontFamily: string;
    textAlign: string;
    textBaseline: string;
    color: string;
  };
};

export const objects: DrawingObject[] = [
  {
    name: "rectangle",
    coordinate: [100, 300],
    width: 100,
    height: 100,
    rounded: "100%",
    opacity: 1,
    lineWidth: 2,
    lineDash: [5, 5],
    rotation: 0,
    lineColor: "rgba(255,255,255,1)",
    bgColor: "rgba(255,255,255,0)",
  },
  {
    name: "rectangle",
    coordinate: [100, 100],
    width: 100,
    height: 100,
    rounded: "10px",
    opacity: 1,
    lineWidth: 2,
    lineDash: [5, 5],
    rotation: 0,
    lineColor: "rgba(255,255,255,1)",
    bgColor: "rgba(255,255,255,1)",
    text: {
      content: "Hello",
      fontSize: 20,
      fontFamily: "Arial",
      textAlign: "center",
      textBaseline: "middle",
      color: "rgb(0,0,0)",
    },
  },
  {
    name: "rectangle",
    coordinate: [150, 100],
    width: 100,
    height: 100,
    rounded: "10px",
    opacity: 1,
    lineWidth: 2,
    lineDash: [5, 5],
    rotation: 0,
    lineColor: "rgba(0,255,0,1)",
    bgColor: "rgba(0,255,0,1)",
    text: {
      content: "Hello",
      fontSize: 20,
      fontFamily: "Arial",
      textAlign: "center",
      textBaseline: "middle",
      color: "rgb(0,0,0)",
    },
  },
];
