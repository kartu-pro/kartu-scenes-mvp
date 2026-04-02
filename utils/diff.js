export const getLcsDiff = (input, expected) => {
    const n = input.length, m = expected.length;
    const dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (input[i - 1] === expected[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    let i = n, j = m;
    const result = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && input[i - 1] === expected[j - 1]) {
            result.unshift({ char: input[i - 1], type: 'match' });
            i--; j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result.unshift({ char: expected[j - 1], type: 'insertion' });
            j--;
        } else {
            result.unshift({ char: input[i - 1], type: 'deletion' });
            i--;
        }
    }
    return result;
};
