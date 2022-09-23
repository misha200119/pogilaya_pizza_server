import App from '@/app';
import moment from 'moment-timezone';
import Order from './db/models/order/model';

const app = new App();

app.listen().then(() => {
  const mockOrder = new Order({
    orderTime: '123321',
    name: 'misha',
    phoneNumber: '+380981488228',
    email: 'aniahucm@gmail.com',
    street: 'lldddsda',
    house: '13',
    flat: '37',
    entrance: '33',
    intercomCode: '1231421431',
    floor: 4,
    comment: "Ya mat' tvoyu ebal suka",
    offCoupon: 'huy tebe',
    paymantType: 'terminal',
    totalCost: 4236732,
    isPaid: false,
    // orderCart: { 1432: 1 },
  });

  mockOrder.save();
});
