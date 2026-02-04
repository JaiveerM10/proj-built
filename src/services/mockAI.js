export const MockAI = {
    generateWeeklyUpdate: async (inputs) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`
Subject: Weekly Update for ${inputs.projectName}

Hi everyone,

Here is the progress report for this week.

**Completed This Week:**
${inputs.progress.split('\n').map(line => `- ${line}`).join('\n')}

**Coming Up Next:**
${inputs.nextSteps.split('\n').map(line => `- ${line}`).join('\n')}

**Risks & Delays:**
${inputs.risks ? inputs.risks : 'No major risks identified at this time.'}

Please let us know if you have any questions.

Best,
The DGN Homes Team
        `.trim());
            }, 1500); // Simulate 1.5s delay
        });
    },

    generateChangeOrder: async (inputs) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    summary: `Change Order Proposal: ${inputs.description}`,
                    analysis: `
**Reason for Change:**
${inputs.reason}

**Impact Analysis:**
This change involves modifying the original plan.
- Cost Impact: +$${inputs.cost}
- Timeline Impact: +${inputs.time} days

**Recommendation:**
Based on the project goals, we recommend proceeding to ensure structural integrity and long-term value.
          `.trim()
                });
            }, 2000);
        });
    },

    generatePhaseExplainer: async (phase) => {
        const content = {
            Framing: "Framing is the skeleton of your home. During this phase, we erect the walls, floor joists, and roof rafters. You'll see the shape of the rooms come to life.",
            Permitting: "We are currently working with the city to secure all necessary permits. This ensures your home meets all safety codes and zoning regulations.",
            Finishing: "This is the final stretch! We are installing flooring, cabinets, fixtures, and trim. The house is transforming from a construction site into a home.",
        };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(content[phase] || "We are currently in a standard construction phase ensuring quality and safety.");
            }, 1000);
        });
    }
};
