import test from "@playwright/test";

test('my Test', async ({ }) => {

    const myText = "mystring";

    const splittedText = myText.split("t")[0]
    const replace = myText.replace("i", "I")

    console.log(splittedText)
    console.log(replace)

    const myArray = ["Rufat", "Joanna", "Miriam"]

    console.log(myArray)

    const myList: string[] = []
    myList.push("value1")
    myList.push("value2")
    myList.push("value3")
    myList.push("value4")

    console.log(myList)

    //hash maps

    const myMap = new Map<string, string>();

    myMap.set("1", "Toyota")
    myMap.set("2", "Volvo")

    console.log(myMap.get("2"))


})