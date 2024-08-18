const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "0a9a4r26",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
  token:
    "sk32slqvmiz9ov41DivlHwwCNjveL5ao1ayulxTK0Mz8SHgynKOBHAVFdloueL4ZNeqmQOcarKjQQVWGVBTK3Rw5Q6fPaOvqnldhs2nox5B1LlKGSyVXkeK6mZeeXkp7dKEYkGP5ULg3gsdfBsjtpXMr5PPlGsNxNNmxzoVOwPpvghmUdE8L", // Only if you want to update content with the client
});

client.delete({
  query: `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "4e6f9a24-9e8a-4816-ae4c-b75ca16a7540"]`,
});
