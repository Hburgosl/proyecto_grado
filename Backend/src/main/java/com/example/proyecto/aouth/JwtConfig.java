/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.aouth;

/**
 *
 * @author owen1
 */
public class JwtConfig {

    public static final String LLAVE_SECRETA = "Howenburgos123*$";
    public static final String RSA_PRIVATE = "-----BEGIN RSA PRIVATE KEY-----\n"
            + "MIIEowIBAAKCAQEAtaBBwTllPYAjUDBs6iuonbiG3k0GTw40+Yiat6az+Fb/mjtJ\n"
            + "aUEhaSibYIjZq3LTbzktUM77uQbnDuKVLuzugSSdd/p9mYPfpP0NEP15B64iQaT6\n"
            + "funk0fHmcz2++c2DMXGfgqR0IGtDbKe1CbMNHro1zV0yR/dNP5b6bgSZ/fVIu90m\n"
            + "17Z8BqwdIr0s0ipX+CTS/ptS6xqXxgDEKhxa0IMFm5mWfr+yNGxaqMnRBomh/0SB\n"
            + "rp9AwtEVyJbCodtTWx38tkCmP9DlMSuIo5vLjAm3y7PBVBngkbjOO6pR3Ypbvewh\n"
            + "eJC3namGmRQcFdrYszxAuQJtMPCX8IuuPGa/VwIDAQABAoIBAEK3ra/W75OZ4F7y\n"
            + "iu+yPexB/njmfmzH4TnQrlTMDcwp2RbEtIDPhgBlBD5/xsWuFnEC5dyLS/h5yqKz\n"
            + "JO3p5urVkmqiP0UHJj4rHoOhOLZThw3qFoJMVNuyKl8mzWJh1dFx1ZBd7LKD9G6T\n"
            + "ZHM9rJIfAOiBVZkOBPhY84E6e37H3rx8cXP3hkaXgAL/86bBo3wWs58tDwraLfkI\n"
            + "Z14nJalTsBXqpJNjrsd67b6BgvCBw93WNxLZwVNx3VUePKBWZXDydMMQaiJLHi8I\n"
            + "CEOt4OeASMnilJ/dvLkrnufRmzqJzmx+gY4+2CWqoifBJuogG5/aHZ3YDoYq9EpZ\n"
            + "MK97rSECgYEA5n+vVRjlJM64lmqKq2HrnfaMKdK1Yc2Lcgs2JybDO5Qha5YMQ/2b\n"
            + "yfcYwK1qYbIfrXfnVbX27sTzBhU0bf9YxWTjjpexTvfidckDnNmcEaNc+rBVWHbn\n"
            + "r5jRR9cFpd1PEIKh8e3nwCZOutBO6RibqOdnExKAkUjBAhaEzPSI/JkCgYEAybhe\n"
            + "wc+8icrD1meM4vxzG0Q/XE+kXvxTcKSgXw3exUSpTS97+9v43AT9y1m0BcyG1TSh\n"
            + "qmAjOYrRRWmh0UzgB1gKLTyOZHWfW0k1hMVnULQxzteosUaotdKDLtGHWpCr1SZa\n"
            + "OJf9m7C/gDHMQMHVyU6su5ISiia9akgM7iltoW8CgYBUiVfgufSwfzCr2f9pw8wK\n"
            + "bzYQ0Lq9WAlglkQSL+FCpJ1tO+bbuNO+SuXFJNTzZ8S+dk9d3BLol0saXASSoygH\n"
            + "nWzoCzJ4Z+mikUrF5/mZbnTXbHygqVtnx4BZ/L6Rio1I3OBQPpTUoDgXw/Zs/x13\n"
            + "4QaotAx7PFetUFz8XmMvYQKBgQCdY2sbkTgr0rbmTLkSSaKN/bvqDIHVUs7PrsMq\n"
            + "JypPhHkMLiZwpnsPQB29UeoyNBhntb8FrikNto/9tqN5KKALWtfl37/CBjwl/4Lw\n"
            + "aw1nXJEYMBAA8X6lDvEn0HfpY8OOdXQjgANyPH/OSAxz4kkp3mbLmvc4L23OxRTB\n"
            + "pjVRpQKBgBr5ULmdBcyQFnk0oeHAHBlwojyryFMrX2GhVnk4Q0aN3PnnTWQmBosd\n"
            + "X+iMGE+c8y6X+aafuAO5+J/vz0QxxZ4Go8wMXrIVNP0DXgxSGoEDBAN3O5YEd+5O\n"
            + "oefw4IpbeVe46KiwQpXXx+9HwqTfCAWv+EsFv/oRXcRSeTNL67pE\n"
            + "-----END RSA PRIVATE KEY-----";

    public static final String RSA_PUBLIC = "-----BEGIN PUBLIC KEY-----\n"
            + "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtaBBwTllPYAjUDBs6iuo\n"
            + "nbiG3k0GTw40+Yiat6az+Fb/mjtJaUEhaSibYIjZq3LTbzktUM77uQbnDuKVLuzu\n"
            + "gSSdd/p9mYPfpP0NEP15B64iQaT6funk0fHmcz2++c2DMXGfgqR0IGtDbKe1CbMN\n"
            + "Hro1zV0yR/dNP5b6bgSZ/fVIu90m17Z8BqwdIr0s0ipX+CTS/ptS6xqXxgDEKhxa\n"
            + "0IMFm5mWfr+yNGxaqMnRBomh/0SBrp9AwtEVyJbCodtTWx38tkCmP9DlMSuIo5vL\n"
            + "jAm3y7PBVBngkbjOO6pR3YpbvewheJC3namGmRQcFdrYszxAuQJtMPCX8IuuPGa/\n"
            + "VwIDAQAB\n"
            + "-----END PUBLIC KEY-----";
}
