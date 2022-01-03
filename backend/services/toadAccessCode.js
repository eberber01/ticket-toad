import TeamModel from "../model/TeamModel.js";

export const newToadCode = () => {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789"
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let accessCode = "";

  for (let i = 0; i < 10; i++) {

    if(i == 2 || i == 8){
        accessCode += upperCaseLetters.charAt(Math.floor(Math.random() * 26))
    }

    if(i == 5 || i == 1 || i == 10 ){
        accessCode += lowerCaseLetters.charAt(Math.floor(Math.random() * 26))
    }

    accessCode += numbers.charAt(Math.floor(Math.random() * 10))


  }

  return accessCode;
};
