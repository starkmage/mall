<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectTab="selectTab"></tab-menu>
      <scroll class="content-tab">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll"

import TabMenu from "./childComps/TabMenu"
import TabContentCategory from "./childComps/TabContentCategory"

import { getCategory, getSubcategory, getCategoryDetail } from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContentCategory
  },
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1
    };
  },
  created() {
    this.getCategory();

  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    }
  },
  methods: {
    getCategory() {
      getCategory().then((value) => {
        //1.获取分类数据
        this.categories = value.data.category.list;

        //2.初始化每个类别的子数据
        for(let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        //3.先请求第一个分类的数据
        this.getSubcategory(0)
      });
    },

    getSubcategory(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(value => {
        //subcategories是一个对象，这是把它的指针指向了value.data
        this.categoryData[this.currentIndex].subcategories = value.data
        //这是保存起来
        this.categoryData = [...this.categoryData]
        // console.log(this.categoryData);
        // this.getCategoryDetail('pop')
        // this.getCategoryDetail('new')
        // this.getCategoryDetail('sell')
      })
    },

    /* getCategoryDetail(type) {
      //1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      //2.发送请求，传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(value => {
        //3.把获取的子类商品数据保存
        this.categoryData[this.currentIndex].categoryDetail[type] = value
        // this.categoryData = {...this.categoryData}
      })
    }, */

    selectTab(index)
    {
      this.getSubcategory(index)
    }
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}

.content {
  overflow: hidden;
  height: calc(100% - 49px - 44px);
  display: flex;
}

.content-tab {
  height: 100%;
  flex: 1;
}
</style>