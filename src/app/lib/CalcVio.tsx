// 要素数を数える

// 文章脅威度計算メソッド
// 同じ文字のカウントできてないz
/**
 * 文字列の出現回数を取得 https://shanabrian.com/web/javascript/string-count.php
 * @param {string|number} 検索元の文字列
 * @param {string|number} 検索する文字列
 * @return {number} 出現回数を返す
 */
const strCount = (searchStr: string, str: string) => {
	if (typeof searchStr !== 'string' && typeof searchStr !== 'number') return 0;
	if (typeof str !== 'string' && typeof str !== 'number') return 0;
	if (searchStr === '' || str === '') return 0;

	return (String(str).match(new RegExp(String(searchStr), 'g')) || []).length;
}

// 会社のお金が使えるならCHATGPT4がここの役割をする
const calcContextViolence = (text:string) =>{
    
    // ここを後で暴言のリストにする
    let array : string[] = ['hoge', 'piyo', 'foo'];

    let count: number = 0;
    for (var elm of array) {
        var violenceExpValue:number = strCount(elm, text)
        console.log(elm+ " is counted "+violenceExpValue)
        count +=violenceExpValue
    }

    console.log("detected count: " + count);

    switch (true) {
        case count <= 2:
            return 10;
            break;
        case count <= 4:
            return 20;
            break;
    }
    return 0
};
