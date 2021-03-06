function Gnd(options) {
    this.r_permissible = options.r_permissible;
    this.isRow = options.isRow;
    this.a = options.a;
    this.h = options.h;
    this.b = options.b;
    this.l = options.l;

    var soilResistivity = options.soilResistivity;
    var seasonalityCoefficient = options.seasonalityCoefficient;
    var l = options.l;
    var d = options.d;
    var h = options.h;
    var r_permissible = options.r_permissible;

    var alRatio = Math.round(this.a/this.l);
    alRatio = Math.max(1, alRatio);
    alRatio = Math.min(3, alRatio);

    this.alRatio = alRatio;
    this.r_calc = soilResistivity * seasonalityCoefficient;
    var t = h + 0.5 * l;
    this.r_pipe = 0.336 * this.r_calc * (Math.log10(2 * l / d) + 0.5 * Math.log10((4 * t + l) / (4 * t - l))) / l;
    this.n_approximate = Math.ceil(this.r_pipe / r_permissible);

    if (this.isRow) {
        this.pipeUseTable = [
            {
                count: 4,
                coefficients: [0.77, 0.89, 0.92]
            },
            {
                count: 5,
                coefficients: [0.74, 0.86, 0.9]
            },
            {
                count: 6,
                coefficients: [0.67, 0.79, 0.85]
            },
            {
                count: 10,
                coefficients: [0.62, 0.75, 0.82]
            },
            {
                count: 20,
                coefficients: [0.42, 0.56, 0.68]
            },
            {
                count: 30,
                coefficients: [0.31, 0.46, 0.58]
            },
            {
                count: 50,
                coefficients: [0.21, 0.36, 0.49]
            },
            {
                count: 65,
                coefficients: [0.2, 0.34, 0.47]
            }
        ];
        this.bandUseTable = [
            {
                count: 5,
                coefficients: [0.72, 0.85, 0.9]
            },
            {
                count: 10,
                coefficients: [0.59, 0.7, 0.79]
            },
            {
                count: 20,
                coefficients: [0.4, 0.55, 0.65]
            },
            {
                count: 30,
                coefficients: [0.3, 0.45, 0.57]
            },
            {
                count: 50,
                coefficients: [0.21, 0.35, 0.49]
            },
            {
                count: 70,
                coefficients: [0.19, 0.33, 0.46]
            }
        ];
        return;
    }

    this.pipeUseTable = [
        {
            count: 4,
            coefficients: [0.45, 0.55, 0.7]
        },
        {
            count: 6,
            coefficients: [0.4, 0.48, 0.64]
        },
        {
            count: 8,
            coefficients: [0.36, 0.43, 0.6]
        },
        {
            count: 10,
            coefficients: [0.34, 0.4, 0.56]
        },
        {
            count: 20,
            coefficients: [0.27, 0.32, 0.45]
        },
        {
            count: 30,
            coefficients: [0.24, 0.3, 0.41]
        },
        {
            count: 50,
            coefficients: [0.21, 0.28, 0.37]
        },
        {
            count: 70,
            coefficients: [0.2, 0.26, 0.35]
        },
        {
            count: 100,
            coefficients: [0.19, 0.24, 0.33]
        }
    ];

    this.bandUseTable = [
        {
            count: 5,
            coefficients: [0.41, 0.5, 0.71]
        },
        {
            count: 10,
            coefficients: [0.33, 0.39, 0.55]
        },
        {
            count: 20,
            coefficients: [0.27, 0.32, 0.44]
        },
        {
            count: 30,
            coefficients: [0.23, 0.3, 0.4]
        },
        {
            count: 50,
            coefficients: [0.21, 0.27, 0.37]
        },
        {
            count: 70,
            coefficients: [0.2, 0.25, 0.35]
        },
        {
            count: 100,
            coefficients: [0,19, 0.24, 0.33]
        }
    ];
}

Gnd.prototype.findN = function (pipeUse) {
    this.pipeUse = pipeUse;
    return Math.ceil(this.r_pipe / (this.r_permissible * pipeUse));
};

Gnd.prototype.findR_band = function (n) {
    if (this.isRow) {
        this.L = this.a * 1.05 * (n - 1);
    }
    else {
        this.L = this.a * 1.05 * n;
    }

    this.r_band = 0.336 * this.r_calc / this.L * Math.log10(2 * this.L * this.L / (this.b * this.h));
};

Gnd.prototype.findR_common = function (n, bandUse) {
    this.r_common = this.r_pipe * this.r_band / (n * this.r_band * this.pipeUse + this.r_pipe * bandUse);
};

Gnd.prototype.getFromTable = function (table, n) {
    var alRatio = this.alRatio;
    var diff = Infinity;
    var diffI = -1;

    for (var i = 0; i < table.length; i++) {
        var localDiff = Math.abs(table[i].count - n);
        if (localDiff > diff) {
            diffI = i;
            break;
        }
        diff = localDiff;
    }

    if (diffI < 0) {
        diffI = table.length - 1;
    }

    return table[diffI].coefficients[alRatio];
};

Gnd.prototype.getPipeUse = function () {
    return this.getFromTable(this.pipeUseTable, this.n_approximate);
};

Gnd.prototype.getBandUse = function (n) {
    return this.getFromTable(this.bandUseTable, n);
};


// console.log('R_calc', gnd.r_calc);
// console.log('R_pipe', gnd.r_pipe);
// console.log('n_approximate', gnd.n_approximate);
// console.log('N', n);
// console.log('L', gnd.L);
// console.log('R_band', gnd.r_band);
// console.log('R_common', gnd.r_common);