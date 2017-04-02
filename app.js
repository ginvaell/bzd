var data = {
  model: {
      'l': {
          name: 'l',
          label: 'Длина заземлителя',
          unit: 'см',
          value: 12.6
      },

      'd': {
          name: 'd',
          label: 'Диаметр заземлителя',
          unit: 'см',
          value: 15.6
      },

      'h': {
          name: 'h',
          label: 'Глубина заложения',
          unit: 'см',
          value: 15.6
      },

      'a': {
          name: 'a',
          label: 'Расстояние между заземлителями',
          unit: 'см',
          value: 15.6
      },

      'phi': {
          name: 'φ',
          label: 'Климатический коэффициент',
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;',
          value: 15.6
      },

      'l1': {
          name: 'l1',
          label: 'Глубина забивки электрода',
          unit: 'см',
          value: 15.6
      },

      'd1': {
          name: 'd1',
          label: 'Диаметр электрода',
          unit: 'см',
          value: 15.6
      },

      'r': {
          name: 'r',
          label: 'Допустимое сопротивление',
          unit: 'Ом',
          value: 15.6
      },

      'b': {
          name: 'b',
          label: 'Ширина полосы',
          unit: 'см',
          value: 15.6
      }
  }
};

var app = new Vue({
    el: '#app',
    data: data
});