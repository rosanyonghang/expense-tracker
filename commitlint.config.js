

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'Feature',
        'BugFix',
        'HotFix',
        'TypoFix',
        'StyleChange',
        'Refactoring',
        'Docs',
        'Improvement',
        'ConfigurationChanges',
        'Test',
        'Chore',
        'Revert',
      ],
    ],
    'type-case': [2, 'always', 'pascal-case'],
    'scope-case': [2, 'always', 'pascal-case'],
    'subject-case': [2, 'always', 'sentence-case'],
  },
  prompt: {
    messages: {},
    questions: {
      type: {
        description: 'please input type:',
      },
    },
  },
};
