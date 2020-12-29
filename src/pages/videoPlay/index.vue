// 视频播放
<template>
    <view class="video_play">
        <image :src="videoObj.img" mode="" />
        <!-- 工具栏  开始-->
        <view class="video_tool">
            <view @click="handleMuted" :class="['iconfont',muted?'icon-jingyin':'icon-volume_icon']"></view>
            <view class="iconfont icon-zhuanfa">
                <button open-type="share"></button>
            </view>
        </view>
        <!-- 工具栏  结束 -->

        <!-- 视频 开始 -->
        <view class="video_wrap">
            <video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
        </view>
        <!-- 视频  结束 -->

        <!-- 下载按钮  开始-->
        <view class="download">
            <view class="download_btn" @click="handleDownload">下载高清</view>
        </view>
        <!-- 下载按钮  结束 -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            videoObj: {},
            // 是否静音
            muted: false
        }
    },
    onLoad() {
        // console.log(getApp().globalData);
        this.videoObj = getApp().globalData.video
    },
    methods: {
        // 开关声音
        handleMuted() {
            this.muted =! this.muted
        },
        // 下载视频
        async handleDownload() {
            await uni.showLoading({
                title:'下载中'
            })
            // 1.将远程文件 下载到小程序内存中
            const {tempFilePath} = (await uni.downloadFile({url: this.videoObj.video}))[1]
            // 2.将内存中的文件  下载到本地中
            await uni.saveVideoToPhotosAlbum({ filePath: tempFilePath })
            uni.hideLoading()
            await uni.showToast({
                title: '完成'
                // icon: 
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .video_play {
        position: relative;
        image {
            position: absolute;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            // css3 滤镜
            filter: blur(20px);
        }
        .video_tool {
            height: 80rpx;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .iconfont {
                width: 60rpx;
                height: 60rpx;
                color: #fff;
                font-size: 40rpx;
                border-radius: 30rpx;
                background-color: rgba(0,0,0,.2);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20rpx;
            }
            .icon-zhuanfa {
                position: relative;
                button {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0; // 透明度
                }
            }
        }
        .video_wrap {
            display: flex;
            justify-content: center;
            video {
                width: 576rpx;
                height: 972rpx;
            }
        }
        .download {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30rpx;
            .download_btn {
                width: 360rpx;
                height: 80rpx;
                border-radius: 40rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                border: 1rpx solid #fff;
                background-color: rgba(0,0,0,.6);
            }
        }
    }
</style>