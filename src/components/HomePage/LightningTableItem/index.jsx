import React, { useEffect } from 'react';
import formatNumber from '../../Common/Format'
function LightningTableItem(props) {
    const {
        macp,
        giaTC,
        giaTran,
        giaSan,
        ktTong,
        giaMua3,
        klMua3,
        giaMua2,
        klMua2,
        giaMua1,
        klMua1,
        gia,
        kl,
        giaBan1,
        klBan1,
        giaBan2,
        klBan2,
        giaBan3,
        klBan3 } = props;
    const ClassNameRender = (giaTran, giaSan, giaTC, val) => {
        if (val === giaTran)
            return "txt-floor";
        else if (val === giaSan)
            return "txt-ceil";
        else if (val === giaTC)
            return "txt-standard";
        else if (val < giaTC)
            return "txt-red";
        else
            return "txt-green";
    }
    console.log(props);
    return (
        <tr className="stock" id={macp}>
            <td
                className={gia===null?'txt-standard':ClassNameRender(giaTran, giaSan, giaTC, gia) + " stockID"}
                //data-tooltip="Công ty công nghệ VJC"
                onClick={() => props.onHandleOrder(macp)}>{macp}</td>
            <td className="special txt-floor">{giaTran}</td>
            <td className="special txt-ceil">{giaSan}</td>
            <td className="special txt-standard">{giaTC}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaMua3)}>{giaMua3}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaMua3)}>{formatNumber(klMua3)}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaMua2)}>{giaMua2}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaMua2)}>{formatNumber(klMua2)}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaMua1)}>{giaMua1 === 0?"ATO":giaMua1}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaMua1)}>{formatNumber(klMua1)}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, gia) + " special"}>{gia}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, gia) + " special"}>{kl}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaBan1)}>{giaBan1 === 0?"ATO":giaBan1}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaBan1)}>{formatNumber(klBan1)}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaBan2)}>{giaBan2}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaBan2)}>{formatNumber(klBan2)}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaBan3)}>{giaBan3}</td>
            <td className={ClassNameRender(giaTran, giaSan, giaTC, giaBan3)}>{formatNumber(klBan3)}</td>
            <td className="">{ktTong}</td>
        </tr>
    );
}
export default LightningTableItem;