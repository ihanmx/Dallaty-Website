import Stack from "@mui/material/Stack";

import AccordionComponent from "./AccordionComponent";

import { v4 as uuidv4 } from "uuid"; //to generate unique keys for components

const FAQs = () => {
  const FAQs = [
    {
      title: "How to verify the match between missing and found items?",
      body: "We utilize artificial intelligence algorithms to match the incomes of missing and found items, and send an alert to the item's owner by Dhallaty staff in the event of a possible match.",
    },
    {
      title: "Is there a service fee?",
      body: "Submitting a report is free, but if your lost item matches the found items list, you will need to pay the service fee.",
    },
    {
      title: "What is Dhallaty's Ambassadors membership?",
      body: "After reporting a found item, you will automatically become an active member. Active Dhallaty ambassadors enjoy discounts, offers, or gifts, which are periodically sent to the email registered in the form, in recognition of their initiative and active contribution to helping the community recover lost items.",
    },
    {
      title: "Does Dhallaty has delivery services?",
      body: "No, it is only an digital service to facilitate the process of finding missing items, and is not responsible for any services related to the missing item itself, including delivering the lost item.",
    },
    {
      title: "What is the duration of finding the missing item?",
      body: "You will be directly alerted if a match is found to pay and reveal the item's location.",
    },
  ];

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        padding: "2rem",

        bgcolor: (theme) => theme.palette.dark.main,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {FAQs.map((question) => (
        <AccordionComponent
          key={uuidv4()}
          title={question.title}
          body={question.body}
        />
      ))}
    </Stack>
  );
};

export default FAQs;
