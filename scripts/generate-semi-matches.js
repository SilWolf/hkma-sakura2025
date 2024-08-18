const { createClient } = require("@sanity/client");

const SCHEDULED_DATES = [
  { date: "2024-08-20", teams: [1, 3, 4, 5] },
  { date: "2024-08-21", teams: [2, 4, 5, 6] },
  { date: "2024-08-22", teams: [1, 2, 3, 6] },
  { date: "2024-08-27", teams: [2, 3, 5, 6] },
  { date: "2024-08-28", teams: [1, 3, 4, 6] },
  { date: "2024-08-29", teams: [1, 2, 4, 5] },
  { date: "2024-09-03", teams: [2, 3, 5, 6] },
  { date: "2024-09-04", teams: [1, 2, 4, 5] },
  { date: "2024-09-05", teams: [1, 3, 4, 6] },
  { date: "2024-09-10", teams: [1, 3, 5, 6] },
  { date: "2024-09-11", teams: [1, 2, 4, 6] },
  { date: "2024-09-12", teams: [2, 3, 4, 5] },
  { date: "2024-09-17", teams: [2, 3, 4, 6] },
  { date: "2024-09-18", teams: [1, 4, 5, 6] },
  { date: "2024-09-19", teams: [1, 2, 3, 5] },
  { date: "2024-09-24", teams: [1, 2, 5, 6] },
  { date: "2024-09-25", teams: [3, 4, 5, 6] },
  { date: "2024-09-26", teams: [1, 2, 3, 4] },
];

const TEAM_IDS = [
  "",
  "6ecfb0bd-d35f-4689-be56-847801b59e47",
  "bcb015b7-054d-4449-8945-9d60aeef50cc",
  "581898b5-924a-423d-a57b-06e08e35d21a",
  "fd8f1746-2d30-40d0-bd03-2e11769a0a4f",
  "750346e0-2fa5-4639-8e59-c8286518aa57",
  "86b05b10-8de0-4a54-95f6-5a0ab0da36f0",
];

const client = createClient({
  projectId: "0a9a4r26",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
  token:
    "sk32slqvmiz9ov41DivlHwwCNjveL5ao1ayulxTK0Mz8SHgynKOBHAVFdloueL4ZNeqmQOcarKjQQVWGVBTK3Rw5Q6fPaOvqnldhs2nox5B1LlKGSyVXkeK6mZeeXkp7dKEYkGP5ULg3gsdfBsjtpXMr5PPlGsNxNNmxzoVOwPpvghmUdE8L", // Only if you want to update content with the client
});

const createMatch = async (name, startAt, teams) => {
  return client.create({
    _type: "match",
    name: name,
    playerEastTeam: {
      _ref: teams[0],
      _type: "reference",
    },
    playerNorthTeam: {
      _ref: teams[1],
      _type: "reference",
    },
    playerSouthTeam: {
      _ref: teams[2],
      _type: "reference",
    },
    playerWestTeam: {
      _ref: teams[3],
      _type: "reference",
    },
    startAt: startAt,
    status: "initialized",
    tournament: {
      _ref: "4e6f9a24-9e8a-4816-ae4c-b75ca16a7540",
      _type: "reference",
    },
  });
};

for (let i = 0; i < SCHEDULED_DATES.length; i++) {
  const teams = SCHEDULED_DATES[i].teams.map((index) => TEAM_IDS[index]);

  createMatch(
    `準決賽 #23Semi${(i + 1).toString().padStart(2, "0")}-1`,
    `${SCHEDULED_DATES[i].date}T11:30:00Z`,
    teams
  )
    .then(() =>
      createMatch(
        `準決賽 #23Semi${(i + 1).toString().padStart(2, "0")}-2`,
        `${SCHEDULED_DATES[i].date}T13:00:00Z`,
        teams
      )
    )
    .then(() => {
      console.log(`${i} DONE.`);
    });
}
