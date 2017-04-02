var data = {

    model: {
        'rho': {
            name: 'ρ',
            label: 'Удельное сопротивление грунта',
            unit: 'Ом*см',
            value: 7157.6
        },

        'phi': {
            name: 'φ',
            label: 'Климатический коэффициент',
            unit: '',
            value: 2.4
        },

        'l': {
            name: 'l',
            label: 'Длина заземлителя',
            unit: 'см',
            value: 250
        },

        'h': {
            name: 'h',
            label: 'Глубина заложения',
            unit: 'см',
            value: 75
        },

        'd': {
            name: 'd',
            label: 'Диаметр заземлителя',
            unit: 'см',
            value: 5
        },

        'a': {
            name: 'a',
            label: 'Расстояние между заземлителями',
            unit: 'см',
            value: 500
        },

        'b': {
            name: 'b',
            label: 'Ширина полосы',
            unit: 'см',
            value: 5
        },

        // 'l1': {
        //     name: 'l1',
        //     label: 'Глубина забивки электрода',
        //     unit: 'см',
        //     value: 15.6
        // },
        //
        // 'd1': {
        //     name: 'd1',
        //     label: 'Диаметр электрода',
        //     unit: 'см',
        //     value: 15.6
        // },

        'r': {
            name: 'r',
            label: 'Допустимое сопротивление',
            unit: 'Ом',
            value: 4.0
        }
    },

    gnd: {},

    pipeUse: null,
    n: null,
    bandUse: null

};

var app = new Vue({
    el: '#app',
    data: function () {
        return data
    },
    created: function () {
        this.runAll();
    },
    methods: {
        runAll: function () {
            this.gnd = new Gnd({
                isRow: true,
                soilResistivity: this.model.rho.value,
                seasonalityCoefficient: this.model.phi.value,
                l: this.model.l.value,
                h: this.model.h.value,
                d: this.model.d.value,
                a: this.model.a.value,
                b: this.model.b.value,
                r_permissible: this.model.r.value
            });
            this.r_calc = this.gnd.r_calc.toFixed(3);
            this.r_pipe = this.gnd.r_pipe.toFixed(3);
            this.n_approximate = this.gnd.n_approximate;

            this.pipeUse = this.gnd.getPipeUse().toFixed(3) ;

            this.runN();
        },
        runN: function () {
            this.n = this.gnd.findN(this.pipeUse);
            this.runR_band();
        },
        runR_band: function () {
            this.gnd.findR_band(this.n);
            this.r_band = this.gnd.r_band.toFixed(3);
            this.foundL = this.gnd.L;
            this.bandUse = this.gnd.getBandUse(this.n).toFixed(3);
            this.runR_common();
        },
        runR_common: function () {
            this.gnd.findR_common(this.n, this.bandUse);
            this.r_common = this.gnd.r_common.toFixed(3);
        }
    },
    computed: {
      isOk: function () {
          console.log(this.model.r.value)
          return this.r_common < this.model.r.value;
      }
    },
    watch: {
        model: {
            deep: true,
            handler: function () {
                this.runAll();
            }
        },

        pipeUse: function () {
            this.runN();
        },

        n: function () {
            this.runR_band();
        },

        bandUse: function () {
            this.runR_common();
        }
    }


});