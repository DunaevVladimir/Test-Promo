export const makePhoneNumber = (input: string) => {
  let newStr = input.concat('__________');

  return `+7(${newStr.slice(0,3)})${newStr.slice(3,6)}-${newStr.slice(6,8)}-${newStr.slice(8,10)}`
}