import degreeToRadian from "./degreeToRadian"

export default (data: { hypotenuse: number, angle: number }) => {
  const { hypotenuse, angle } = data

  return {
    x: [270, 90].includes(angle) ? 0 : (hypotenuse * Math.cos(degreeToRadian(angle))),
    y: [180, 0].includes(angle) ? 0 : (hypotenuse * Math.sin(degreeToRadian(angle))),
  }
}
