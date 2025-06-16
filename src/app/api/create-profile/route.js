const { NextResponse } = require("next/server");
const { insertUser, updateUserByID } = require("../../../../lib/useHelper");

export async function POST(request) {
  let data = await request.json();
  const isNewUser = data?.isNewUser;
  if (isNewUser) {
    try {
      console.log("data: ", data.id);
      const response = await insertUser(data);
      console.log("response creating new user: ", response);
      return NextResponse.json({ message: "Successfully created new User" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error creating new User" });
    }
  } else {
    try {
      const response = await updateUserByID(data.id, data);
      return NextResponse.json({ message: "Successfully saved User" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error saving User" });
    }
  }
}
