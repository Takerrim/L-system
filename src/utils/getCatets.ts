import degreeToRadian from "./degreeToRadian"

export default (data: { hypotenuse: number, angle: number }) => {
  const { hypotenuse, angle } = data

  return {
    x: angle === 90 || angle === 270 ? 0 : (hypotenuse * Math.cos(degreeToRadian(angle))),
    y: angle % 180 === 0 || angle === 0 ? 0 : (hypotenuse * Math.sin(degreeToRadian(angle))),
  }
}
