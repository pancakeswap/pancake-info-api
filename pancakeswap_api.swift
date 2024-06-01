struct PancakeswapTokenResponse: Codable {
    let updated_at: Int
    let data: PancakeswapTokenData
}

struct PancakeswapTopTokenResponse: Codable {
    let updated_at: Int
    let data: [String:[String:String]]
}

struct PancakeswapTokenData: Codable {
    let name, symbol, price, price_BNB: String
}

class PancakeswapTokenService {

    //MARK: Call top token data.
    func getTopTokens(completion:@escaping ([PancakeswapTokenData]) -> ()) {
        let urlString = "https://api.pancakeswap.info/api/v2/tokens"
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            let call = URLSession.shared.dataTask(with: request) {(data,response,error) in
                if let callData = try? JSONDecoder().decode(PancakeswapTopTokenResponse.self, from: data!) {
                    var returnValues = [PancakeswapTokenData]()
                    let topData = callData.data
                    let allTokenAddresses = Array(topData.keys).sorted()
                    for each in 0..<topData.count {
                        let tokenAddress = allTokenAddresses[each]
                        let parsedTokenData = topData[tokenAddress]!
                        let name = parsedTokenData["name"]!
                        let symbol = parsedTokenData["symbol"]!
                        let price = parsedTokenData["price"]!
                        let price_BNB = parsedTokenData["price_BNB"]!
                        let tokenData = PancakeswapTokenData(name: name, symbol: symbol, price: price, price_BNB: price_BNB)
                        returnValues.append(tokenData)
                    }
                    DispatchQueue.main.async {
                        completion(returnValues)
                    }
                }
            }
            call.resume()
        }
    }
    
    //MARK: Call data about a specific token.
    func getTokenData(token:String,completion:@escaping (PancakeswapTokenData) -> ()) {
        let urlString = "https://api.pancakeswap.info/api/v2/tokens/\(token)"
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            let call = URLSession.shared.dataTask(with: request) {(data, response, error) in
                if let callData = try? JSONDecoder().decode(PancakeswapTokenResponse.self, from: data!) {
                    let dataValues = callData.data
                    let tokenData = PancakeswapTokenData(name: dataValues.name, symbol: dataValues.symbol, price: dataValues.price, price_BNB: dataValues.price_BNB)
                    DispatchQueue.main.async {
                        completion(tokenData)
                    }
                }
            }
            call.resume()
        }
    }
}

//Usage Example:
let cake = PancakeswapTokenService()

cake.getTokenData(token: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82") { result in
    print(result.name)  //PancakeSwap Token
    print(result.symbol)  //Cake
    print(result.price) //10.2531139075314984596226239414
    print(result.price_BNB) //0.02444718516239862829193764936034
}

cake.getTopTokens() { result in
    for each in 0..<result.count {
        let token = result[each]
        print("\(token.name), \(token.symbol), \(token.price), \(token.price_BNB)")
    }
}

// Results:
// YOOSHI, YOOSHI, 0.000000572611675210853231405130217724, 0.000000001365399876515470036298175236083
// Harmony ONE, ONE, 0.269369410625922073615826270782, 0.0006421994306497966306074341004304
// rUSD, rUSD, 0.978066081745409247727706326257, 0.00231521662329187050053940909931
// etc...
