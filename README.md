<img src="https://raw.githubusercontent.com/innovacoin/copay-innova/master/resources/innova/android/icon/drawable-xxxhdpi-icon.png" alt="Copay" width="79">

[![Build Status](https://secure.travis-ci.org/innovacoin/copay-innova.svg)](http://travis-ci.org/innovacoin/copay-innova)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/copay/localized.png)](https://crowdin.com/project/copay)

Copay is a secure Bitcoin and Bitcoin Cash wallet platform for both desktop and mobile devices. Copay uses [Bitcore Wallet Service](https://github.com/CircuitBreaker88/bitcore-wallet-service-innova) (BWS) for peer synchronization and network interfacing.

Binary versions of Copay are available for download at [Copay.io](https://copay.io/#download). Copay Binaries are signed with the key `copay@bitpay.com` – See the section [`How to Verify Copay Signatures`](https://github.com/innova-foundation/innova#how-to-verify-copay-signatures) for details.

For a list of frequently asked questions please visit the [Copay FAQ](https://github.com/innova-foundation/innova/wiki/COPAY---FAQ).

## Main Features

- Supports Bitcoin (BTC) and Bitcoin Cash (BCH) wallets
- Multiple wallet creation and management in-app
- Intuitive, multisignature security for personal or shared wallets
- Easy spending proposal flow for shared wallets and group payments
- [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Hierarchical deterministic (HD) address generation and wallet backups
- Device-based security: all private keys are stored locally, not in the cloud
- Support for Bitcoin testnet wallets
- Synchronous access across all major mobile and desktop platforms
- Payment protocol (BIP70-BIP73) support: easily-identifiable payment requests and verifiable, secure bitcoin payments
- Support for over 150 currency pricing options and unit denomination in BTC or bits
- Mnemonic (BIP39) support for wallet backups
- Paper wallet sweep support (BIP38)
- Hardware wallet support (Trezor and Ledger) (only in Chrome App version)
- Email notifications for payments and transfers
- Push notifications (only available for ios and android versions)
- Customizable wallet naming and background colors
- Multiple languages supported
- Available for [iOS](https://itunes.apple.com/us/app/copay/id951330296), [Android](https://play.google.com/store/apps/details?id=com.bitpay.copay&hl=en), [Windows Phone](https://www.microsoft.com/en-us/store/p/copay-secure-bitcoin-wallet/9nm8z2b0387b),
 [Chrome App](https://chrome.google.com/webstore/detail/copay/cnidaodnidkbaplmghlelgikaiejfhja?hl=en), [Linux](https://github.com/innova-foundation/innova/releases/latest), [Windows](https://github.com/innova-foundation/innova/releases/latest) and [OS X](https://github.com/innova-foundation/innova/releases/latest) devices

## Testing in a Browser

> **Note:** This method should only be used for development purposes. When running Copay in a normal browser environment, browser extensions and other malicious code might have access to internal data and private keys. For production use, see the latest official [releases](https://github.com/innova-foundation/innova/releases/).

Clone the repo and open the directory:

```sh
git clone https://github.com/innova-foundation/innova.git
cd copay
```

Ensure you have [Node](https://nodejs.org/) installed, then install and start Copay:

```sh
npm run apply:copay
npm start
```

Visit [`localhost:8100`](http://localhost:8100/) to view the app.

A watch task is also available to rebuild components of the app as changes are made. This task can be run in a separate process – while the server started by `npm start` is running – to quickly test changes.

```
npm run watch
```

## Testing on Real Devices

It's recommended that all final testing be done on a real device – both to assess performance and to enable features that are unavailable to the emulator (e.g. a device camera).

### Android

Follow the [Cordova Android Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/) to set up your development environment.

When your developement enviroment is ready, run the `start:android` npm package script.

```sh
npm run apply:copay
npm run start:android
```

### iOS

Follow the [Cordova iOS Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/) to set up your development environment.

When your developement enviroment is ready, run the `start:ios` npm package script.

```sh
npm run apply:copay
npm run start:ios
```

### Windows Phone

Follow the [Cordova Windows Phone Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/win8/index.html) to set up your development environment.

When your developement enviroment is ready, follow this instructions:

- Go to app-template folder, search for config-template.xml and then remove this line:
```sh
<plugin name="cordova-plugin-qrscanner" spec="~2.5.0" />
```
and then enable this one:
```sh
<plugin name="phonegap-plugin-barcodescanner" spec="https://github.com/phonegap/phonegap-plugin-barcodescanner.git" />
```
- Run:
```sh
npm run clean-all
npm run apply:copay
npm run start:windows
```
- Then open the project file with VS inside cordova/platform/windows/

### Desktop (Linux, macOS, and Windows)

The desktop version of Copay currently uses NW.js, an app runtime based on Chromium. To get started, first install NW.js on your system from [the NW.js website](https://nwjs.io/).

When NW.js is installed, run the `start:desktop` npm package script.

```sh
npm run apply:copay
npm run start:desktop
```

## Build Copay App Bundles

Before building the release version for a platform, run the `clean-all` command to delete any untracked files in your current working directory. (Be sure to stash any uncommited changes you've made.) This guarantees consistency across builds for the current state of this repository.

The `final` commands build the production version of the app, and bundle it with the release version of the platform being built.

### Android

```sh
npm run clean-all
npm run apply:copay
npm run final:android
```

### iOS

```sh
npm run clean-all
npm run apply:copay
npm run final:ios
```

### Windows Phone

- Install Visual Studio 2015 (or newer)
- Go to app-template folder, search for config-template.xml and then remove this line:
```sh
<plugin name="cordova-plugin-qrscanner" spec="~2.5.0" />
```
and then enable this one:
```sh
<plugin name="phonegap-plugin-barcodescanner" spec="https://github.com/phonegap/phonegap-plugin-barcodescanner.git" />
```
- Run:
```sh
npm run clean-all
npm run apply:copay
npm run final:windows
```
- Then open the project file with VS inside cordova/platform/windows/

### Desktop (Linux, macOS, and Windows)

```sh
npm run clean-all
npm run apply:copay
npm run final:desktop
```

### Google Chrome App

> cd chrome-app/

```sh
npm run apply:copay
grunt
make
```

On success, the Chrome extension will be located at: `browser-extensions/chrome/copay-chrome-extension`.  To install it go to `chrome://extensions/` in your browser and ensure you have the 'developer mode' option enabled in the settings.  Then click on "Load unpacked chrome extension" and choose the directory mentioned above.

## Configuration

### Enable External Services

To enable external services, set the `COPAY_EXTERNAL_SERVICES_CONFIG_LOCATION` or `BITPAY_EXTERNAL_SERVICES_CONFIG_LOCATION` environment variable to the location of your configuration before running the `apply` task.

```sh
COPAY_EXTERNAL_SERVICES_CONFIG_LOCATION="~/.copay/externalServices.json" npm run apply:copay
# or
BITPAY_EXTERNAL_SERVICES_CONFIG_LOCATION="~/.bitpay/externalServices.json" npm run apply:bitpay
```

## About Copay

### General

Copay implements a multisig wallet using [p2sh](https://en.bitcoin.it/wiki/Pay_to_script_hash) addresses.  It supports multiple wallets, each with its own configuration, such as 3-of-5 (3 required signatures from 5 participant peers) or 2-of-3.  To create a multisig wallet shared between multiple participants, Copay requires the extended public keys of all the wallet participants.  Those public keys are then incorporated into the wallet configuration and combined to generate a payment address where funds can be sent into the wallet.  Conversely, each participant manages their own private key and that private key is never transmitted anywhere.

To unlock a payment and spend the wallet's funds, a quorum of participant signatures must be collected and assembled in the transaction.  The funds cannot be spent without at least the minimum number of signatures required by the wallet configuration (2-of-3, 3-of-5, 6-of-6, etc.).  Once a transaction proposal is created, the proposal is distributed among the wallet participants for each to sign the transaction locally.  Finally, when the transaction is signed, the last signing participant will broadcast the transaction to the Bitcoin network.

Copay also implements [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) to generate new addresses for peers.  The public key that each participant contributes to the wallet is a BIP32 extended public key.  As additional public keys are needed for wallet operations (to produce new addresses to receive payments into the wallet, for example) new public keys can be derived from the participants' original extended public keys.  Once again, it's important to stress that each participant keeps their own private keys locally - private keys are not shared - and are used to sign transaction proposals to make payments from the shared wallet.

For more information regarding how addresses are generated using this procedure, see: [Structure for Deterministic P2SH Multisignature Wallets](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki).

## Copay Backups and Recovery

Since v1.2 Copay uses BIP39 mnemonics for backing up wallets.  The BIP44 standard is used for wallet address derivation. Multisig wallets use P2SH addresses, while non-multisig wallets use P2PKH.

Information about backup and recovery procedures is available at: https://github.com/innova-foundation/innova/blob/master/backupRecovery.md

Previous versions of Copay used files as backups. See the following section.

It is possible to recover funds from a Copay Wallet without using Copay or the Wallet Service, check the [Copay Recovery Tool](https://github.com/innova-foundation/innova-recovery).


## Wallet Export Format

Copay encrypts the backup with the [Stanford JS Crypto Library](http://bitwiseshiftleft.github.io/sjcl/).  To extract the private key of your wallet you can use https://bitwiseshiftleft.github.io/sjcl/demo/, copy the backup to 'ciphertext' and enter your password.  The resulting JSON will have a key named: `xPrivKey`, that is the extended private key of your wallet.  That information is enough to sign any transaction from your wallet, so be careful when handling it!

The backup also contains the key `publicKeyRing` that holds the extended public keys of the Copayers.
Depending on the key `derivationStrategy`, addresses are derived using
[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) or [BIP45](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki). Wallets created in Copay v1.2 and forward always use BIP44, all previous wallets use BIP45. Also note that since Copay version v1.2, non-multisig wallets use address types Pay-to-PublicKeyHash (P2PKH) while multisig wallets still use Pay-to-ScriptHash (P2SH) (key `addressType` at the backup):

| Copay Version  | Wallet Type   | Derivation Strategy   | Address Type  |
|---|---|---|---|---|
|  <1.2  | All  |  BIP45 | P2SH   |
|  >=1.2 | Non-multisig  | BIP44  | P2PKH   |
| >=1.2  | Multisig  |  BIP44 |  P2SH   |
| >=1.5  | Multisig Hardware wallets  |  BIP44 (root m/48') |  P2SH   |

Using a tool like [Bitcore PlayGround](http://bitcore.io/playground) all wallet addresses can be generated. (TIP: Use the `Address` section for P2PKH address type wallets and `Multisig Address` for P2SH address type wallets). For multisig addresses, the required number of signatures (key `m` on the export) is also needed to recreate the addresses.

BIP45 note: All addresses generated at BWS with BIP45 use the 'shared cosigner index' (2147483647) so Copay address indexes look like: `m/45'/2147483647/0/x` for main addresses and `m/45'/2147483647/1/y` for change addresses.

Since version 1.5, Copay uses the root `m/48'` for hardware multisignature wallets. This was coordinated with Ledger and Trezor teams. While the derivation path format is still similar to BIP44, the root was in order to indicate that these wallets are not discoverable by scanning addresses for funds. Address generation for multisignature wallets requires the other copayers extended public keys.


## Bitcore Wallet Service

Copay depends on [Bitcore Wallet Service](https://github.com/CircuitBreaker88/bitcore-wallet-service-innova) (BWS) for blockchain information, networking and Copayer synchronization.  A BWS instance can be setup and operational within minutes or you can use a public instance like `https://bws.bitpay.com`.  Switching between BWS instances is very simple and can be done with a click from within Copay.  BWS also allows Copay to interoperate with other wallets like [Bitcore Wallet CLI] (https://github.com/CircuitBreaker88/bitcore-wallet-innova).

## Hardware Wallet Support

Copay supports Ledger and Trezor hardware wallets. Hardware wallet support is only available through the Chrome App. Ledger support is only available on multisig wallets.

To use Ledger, you need to have the Ledger Chrome App installed, available at:
https://chrome.google.com/webstore/detail/ledger-wallet/kkdpmhnladdopljabkgpacgpliggeeaf

To use Trezor, you need to have the Trezor Chrome Extension installed, available at:
https://chrome.google.com/webstore/detail/trezor-chrome-extension/jcjjhjgimijdkoamemaghajlhegmoclj

To create or join a wallet using Ledger or Trezor go to:

  Add Wallet -> Create or Join -> Advanced options -> Wallet Seed -> select Trezor or Ledger

Both devices support multiple accounts, so you can use them for multiple wallets. Select the account and then click on create or join.

It is also possible to import a wallet from a device using:
  Add Wallet -> Import -> Hardware wallet

Here it is also necesary to select the account number.

When creating or joining a wallet, Copay will ask for two public keys for the device. One public keys is used for the wallet itself and the other is used as an entropy source to create a private / public key pair for signing requests to the Wallet Service.

Every time you need to sign a transaction, the device will be needed to perform the signature. Follow the on screen instructions after clicking the `send` or `accept` buttons.

Finally, in case you lose the device and you have the 24 word seed for the device, you can recover access to your funds using Copay, see: https://github.com/innova-foundation/innova/blob/master/backupRecovery.md#hardware-wallets


## Translations
Copay uses standard gettext PO files for translations and [Crowdin](https://crowdin.com/project/copay) as the front-end tool for translators.  To join our team of translators, please create an account at [Crowdin](https://crowdin.com) and translate the Copay documentation and application text into your native language.

To download and build using the latest translations from Crowdin, please use the following commands:

```sh
cd i18n
node crowdin_download.js
```

This will download all partial and complete language translations while also cleaning out any untranslated ones.

**Translation Credits:**
- Japanese: @dabura667
- French: @kirvx
- Portuguese: @pmichelazzo
- Spanish: @cmgustavo
- German: @saschad
- Russian: @vadim0

*Gracias totales!*

## Release Schedules
Copay uses the `MAJOR.MINOR.BATCH` convention for versioning.  Any release that adds features should modify the MINOR or MAJOR number.

### Bug Fixing Releases

We release bug fixes as soon as possible for all platforms.  Usually around a week after patches, a new release is made with language translation updates (like 1.1.4 and then 1.1.5).  There is no coordination so all platforms are updated at the same time.

### Minor and Major Releases
- t+0: tag the release 1.2 and "text lock" (meaning only non-text related bug fixes. Though this rule is sometimes broken, it's good to make a rule.)
- t+7: testing for 1.2 is finished, translation is also finished, and 1.2.1 is tagged with all translations along with bug fixes made in the last week.
- t+7: iOS is submitted for 1.2.1. All other platforms are submitted with auto-release off.
- t + (~17): All platforms 1.2.1 are released when Apple approves the iOS application update.

## How to Verify Copay Signatures

 1. Download the `copay@bitpay.com` public key (`gpg --recv-keys 1112CFA1`)
 2. Download Copay binary (`$FILENAME`) and signature file (`$FILENAME.sig`)
 3. Verify the signature by running:

``` bash
$ gpg --verify \
 $FILENAME.sig \
 $FILENAME

# It should return:
Good signature from "Copay (visit copay.io) <copay@bitpay.com>"
```

### Public Key for Copay Binaries
Instead of importing the public key from a public server (like gnu's) you can grab it from here:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: SKS 1.1.5
Comment: Hostname: pgp.mit.edu

mQMuBFO8l6sRCAD+VYKPjZY7hMCKVC3KWCkcqvSXEfiqx8KIVSp4yKx1blpVHoBYfAj13Lls
XkVMujjRVZZB8tVxl3282T/1T4VNLdHy+HvulWbAmZRAJzTw8xZYkb7L9iFFVvIHk2o31Gbq
7PAvML2MKA556jd0/OjixDR8mLpdAee8la+09RHuWhOYtFJ4nyrVW0nVFApqj1R90eXMcvOj
vSEdVHEmO341RiwayadfGRRwTqlYtsIx0k64+dpGyjA0CnJJLKVKPTzyn3bQEFhrCq41XfJf
AFI928/YVb4Wmbd51wgDv01c2b/gyGXwNFW+Qxj9xIcVgK/EPMn2I5j4eBsnOZy9Gn9vAQDj
SfX26Q6nU1x7ULPjGJ/SefPkYm2swp1Gxfmn78bXFwgA/Q7/QqqARHuUtO3ZP4FgmcxxYYK8
M+/+ROKoUUPA7Hx3cG3eq86Q5Ok7ADGFTurjaOdZmuV42E54t1pKIYvAe3IJLXr06cx3Vb8L
zLtalsQsYh2IebwRTu2wvQpsSJxBoVUzwmosNWiOuIemlTpujUFmP89Wad8MsnQSRBNoK0D7
03ckYjVRJPD+qd788c9JGyTredk0gJzV2dqesMFT+EaLuNUuOktWC+jTGZ5xK9F7EXN0ZfIM
fKDLFxvCL2a9cTCJIVirn1Ur6QHDsw5PBD/U7DDZDkk9Hzl1ep3qk7PVMn/xDzz3MxKRKKd+
d7d7wZA9OE+iKoivcAPeC1yTxQgA8KEaCz2TuS1+M9A+8PzGebKJ1OazwCb+tIGWCXUeJlIh
dRV7W/kre6e4fv0UOxDJHBrIoD1vIGtHguOGSMEnFuVJFDIH2HXXr5oxJkO86RMAig+EbglT
BJbFEfdx8Ruwhw74JzetijGHYRG62u7n8o8iX6RbpTdzt/nq26fs3Ts0SLMHfP26ZVHJOjY6
2dTCrw0q20RC4i9HWHJ0g694YBPYvhp2gYks93tigHbIqB1GhpBmBauuNvXRvNs493Rn40FI
wNMtWZBcQSMch1aEm4j5njDTt4+a6c/v8W2px3u8nFacKBR5FV86WjHEg+HmNx72nvfE/PQW
HEQixfyiObQpQ29wYXkgKHZpc2l0IGNvcGF5LmlvKSA8Y29wYXlAYml0cGF5LmNvbT6IegQT
EQgAIgUCU7yXqwIbAwYLCQgHAwIGFQgCCQoLBBYCAwECHgECF4AACgkQXNYAphESz6FzCQEA
wcLYPogeVLbG3ZL5Bi/Be7U4ctNgewfKEZSSmec3vBYBAIB2xXhiq5ZER1P033KFT8g5pgY2
fMbk4YsO11Yj2B2m
=tKra
-----END PGP PUBLIC KEY BLOCK-----
```
Save that text to /tmp/key, and then import it as follows:
```
gpg --import /tmp/key
```
(Thanks @pzkpfwVI and @mika-mitzahlen for this section, taken from [Gist](https://gist.github.com/matiu/61c9f529efeeba66c0e2).



## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## Support

 Please see [Support requests](CONTRIBUTING.md#support)


## License

Copay is released under the MIT License.  Please refer to the [LICENSE](https://github.com/innova-foundation/innova/blob/master/LICENSE) file that accompanies this project for more information including complete terms and conditions.
