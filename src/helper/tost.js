const { toast } = require("sonner");

const message = () => {
  console.log("message");
  toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
};

export default message;
