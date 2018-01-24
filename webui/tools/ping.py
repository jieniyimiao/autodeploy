import os
import platform


def ping(host):
    if platform.system() == 'Windows':
        cmd = 'ping -n %d %s' % (1, host)
    else:
        cmd = 'ping -c %d %s' % (1, host)

    # 0 is crash, 1 is ok
    ret = os.system(cmd)
    # print ret
    if not ret:
        return "ok"
    else:
        return "crash"


if __name__ == "__main__":
    print ping('www.baidu.com')
