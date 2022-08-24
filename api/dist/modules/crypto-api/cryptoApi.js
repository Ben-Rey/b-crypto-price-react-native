"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoDetails = exports.getPrice = void 0;
const axios_1 = __importDefault(require("axios"));
function getPrice() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const result = yield axios_1.default.get(
        `${process.env.MESSARI_URL}assets?fields=id,slug,symbol,metrics/market_data/price_usd`,
        {
          headers: {
            "x-messari-api-key": process.env.MESSARI_API_KEY,
          },
        }
      );
      return result.data.data.map((item) => ({
        id: item.id,
        name: item.slug,
        symbol: item.symbol,
        price: item.metrics.market_data.price_usd,
      }));
    } catch (error) {
      console.log(error);
    }
  });
}
exports.getPrice = getPrice;
function getCryptoDetails(assetKey) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const result = yield axios_1.default.get(
        `${process.env.MESSARI_URL}assets/${assetKey}/metrics/market-data`,
        {
          headers: {
            "x-messari-api-key": process.env.MESSARI_API_KEY,
          },
        }
      );
      console.log(result.data.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  });
}
exports.getCryptoDetails = getCryptoDetails;
