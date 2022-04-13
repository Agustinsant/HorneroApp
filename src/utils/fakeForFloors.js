export const buildings = [
  {
    name: "Poseidon",
    city: "Mar del plata",
    address:
      "Av. Colón 1114, B7600FXR Mar del Plata, Provincia de Buenos Aires",
    imgBuilding:
      "https://1.bp.blogspot.com/-TIkCvBHG_Eo/Xfpu6wPo_oI/AAAAAAAAToo/dqs_OmbToA8_QZZb4eTiqb-8G1VFX0tDgCLcBGAsYHQ/s400/Logo.jpg",
    Floors: [
      {
        name: "1ª Floor",
        imgFloor:
          "https://archello.s3.eu-central-1.amazonaws.com/images/2018/04/05/-PAB4469.1522942283.9409.jpg",
        Desks: [
          {
            positionX: 50,
            positionY: 50,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 50,
            positionY: 90,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 50,
            positionY: 130,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 50,
            positionY: 170,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 75,
            positionY: 50,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 75,
            positionY: 90,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 75,
            positionY: 130,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 75,
            positionY: 170,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 150,
            positionY: 50,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 150,
            positionY: 90,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 150,
            positionY: 130,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 150,
            positionY: 170,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 175,
            positionY: 50,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 175,
            positionY: 90,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 175,
            positionY: 130,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
          {
            positionX: 175,
            positionY: 170,
            imgDesk: "",
            rotation: 90,
            calendar: [],
          },
        ],
      },
    ],
  },
];

export const  data= {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octumbre','Noviembre','Diciembre'],
  datasets: [{
      label: 'Reservas por Mes',
      data: [12, 19, 3, 5, 2, 3, 50, 80, 100, 25],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
  }]
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' 
    },
    title: {
      display: true,
      text: 'Reservas del Ano',
    },
  },
}