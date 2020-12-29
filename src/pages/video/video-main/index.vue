<template>
    <scroll-view scroll-y enable-flex class="video_main" @scrolltolower="handleScrolltolower">
        <view class="video_item" v-for="item in videowp" :key="item.id" @click="handleGoVideo(item)">
            <image :src="item.img" mode="widthFix" />
        </view>
    </scroll-view>
</template>

<script>
export default {
    data() {
        return {
            videowp: [],
            hasMore: true
        }
    },
    props: {
        urlobj: Object
    },
    // 监控数据发生变化后执行函数
    watch: {
        urlobj(){
            // console.log("参数发生变化了",this.urlobj);
            this.videowp = []
            this.getList()
        }
    },
    mounted() {
        // console.log(this.urlobj);
        this.getList()
    },
    methods: {
        getList() {
            this.request({
                url: this.urlobj.url,
                data: this.urlobj.params
            }).then(result => {
                // console.log(result);
                if(result.res.videowp.length === 0) {
                    this.hasMore = false
                    uni.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                    })
                    return
                }
                this.videowp = [...this.videowp,...result.res.videowp]
            })
        },
        // 分页事件（滚动页面触底加载事件）
        handleScrolltolower() {
            if(this.hasMore) {
                this.urlobj.params.skip+=this.urlobj.params.limit
                this.getList()
            } else {
                uni.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                })
            }
        },
        // 视频点击事件
        handleGoVideo(item) {
            // 1.将数据存到全局共享中
            getApp().globalData.video = item
            // 2.页面跳转
            uni.navigateTo({
                 url: '/pages/videoPlay/index'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .video_main {
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh - 36px);
        .video_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
</style>