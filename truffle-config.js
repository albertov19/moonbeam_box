const PrivateKeyProvider = require('./private-provider');
// Standalone Development Node Private Key
const privateKeyDev =
   '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342';
// Moonbase Alpha Private Key --> Please change this to your own Private Key with funds
const privateKeyMoonbase =
   'd2d0ac4e9a8d6bff910a529477f7ea76c457e7f9e1e7b04d7d85d9cd7c63c1e6';

module.exports = {
   networks: {
      dev: {
         provider: () => {
            if (!privateKeyDev.trim()) {
               throw new Error('Please enter a private key with funds, you can use the default one');
            }
            new PrivateKeyProvider(privateKeyDev, 'http://localhost:9933/', 43)
         },
         network_id: 43,
      },
      moonbase: {
         provider: () => {
            if (!privateKeyMoonbase.trim()) {
               throw new Error('Please enter a private key with funds to send transactions to TestNet');
            }
            if (privateKeyDev == privateKeyMoonbase) {
               throw new Error('Please change the private key used for Moonbase to your own with funds');
            }
            new PrivateKeyProvider(privateKeyMoonbase, 'https://rpc.testnet.moonbeam.network', 43)
         },
         network_id: 43,
      },
   },

   plugins: ['moonbeam-truffle-plugin']
};
