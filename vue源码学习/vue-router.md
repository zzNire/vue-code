
## 注册
```js
export function install (Vue) {
    // ...
     // 混入 beforeCreate 钩子
     Vue.mixin({
       beforeCreate () {
         // 在option上面存在router则代表是根组件 
         if (isDef(this.$options.router)) {
           this._routerRoot = this
           this._router = this.$options.router
           // 执行_router实例的 init 方法
           this._router.init(this)
           // 为 vue 实例定义数据劫持
           Vue.util.defineReactive(this, '_route', this._router.history.current)
         } else {
           // 非根组件则直接从父组件中获取
           this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
         }
         registerInstance(this, this)
       },
       destroyed () {
         registerInstance(this)
       }
     })
    
     // 设置代理，当访问 this.$router 的时候，代理到 this._routerRoot._router
     Object.defineProperty(Vue.prototype, '$router', {//Router
       get () { return this._routerRoot._router }
     })
     // 设置代理，当访问 this.$route 的时候，代理到 this._routerRoot._route
     Object.defineProperty(Vue.prototype, '$route', {
       get () { return this._routerRoot._route }
     })
    
     // 注册 router-view 和 router-link 组件
     Vue.component('RouterView', View)
     Vue.component('RouterLink', Link)
   
     // Vue钩子合并策略
     const strats = Vue.config.optionMergeStrategies
     // use the same hook merging strategy for route hooks
     strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
     // ...
   }
```

`Vue.use(Router)` 调用 vue-router 的 install 方法
* 在 beforeCreate 钩子函数中加入，将 router实例挂载到 vm 实例的 _router 上，并为每一个组件实例挂载 _routerRoot 属性，并渲染 router-view
* 对 _route 对象 做响应式处理
* 注册全局组件 router-view router-link,以及全属性 $router $route
```js
 // 执行 vm.$options._parentVnode.data.registerRouteInstance 渲染 router-view 组件
 const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  data.registerRouteInstance = (vm, val) => {
  // ...
  return h(component, data, children)
}
```

## new 一个VueRouter实例
```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar,
      children:[
        {
          path:':id',
          name:'singerDetial',
          component:singerDetial,
        }, }
  ]
})
```

### createMatcher
createMatcher 根据传入的 routes 属性 返回 match 和 addRoutes 方法

`pathList, pathMap, nameMap` 就是 路径 和 RouteRecord 的对应关系


```js
  const record: RouteRecord = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  }
```

### 生成 history对象
确定 mode，默认为 hashHistory，生成 history实例
```js
  constructor (router: Router, base: ?string) {
    this.router = router
    this.base = normalizeBase(base)
    // start with a route object that stands for "nowhere"
    this.current = START
    this.pending = null
    this.ready = false
    this.readyCbs = []
    this.readyErrorCbs = []
    this.errorCbs = []
  }
```
## VueRouter init 方法

```js
init (app: any /* Vue component instance */) {
    this.apps.push(app)
    this.app = app

    const history = this.history

    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route
      })
    })
  }


//返回了当前路径
    getCurrentLocation () {
    return getHash()
  }

  export function getHash (): string {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  let href = window.location.href
  const index = href.indexOf('#')
  // empty path
  if (index < 0) return ''

  href = href.slice(index + 1)
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  const searchIndex = href.indexOf('?')
  if (searchIndex < 0) {
    const hashIndex = href.indexOf('#')
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
    } else href = decodeURI(href)
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
    }
  }

  return href
}
```

## history
hash虽然出现在url中，但不会被包括在http请求中，它是用来指导浏览器动作的，对服务器端没影响，因此，改变hash不会重新加载页面。

每一次改变`hash(window.location.hash)`，都会在浏览器访问历史中增加一个记录。

### treansitionTo
```js
  transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    //location 是 当前解析的url this.current
    const route = this.router.match(location, this.current) //获得当前路由的 RouteRecord 对象 并通过 _createRoute方法 放回 router对象
    this.confirmTransition(
      route,
      () => { //confirmTransition 执行完毕后的回调函数
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()

        // fire ready cbs once
        if (!this.ready) {
          this.ready = true
          this.readyCbs.forEach(cb => {
            cb(route)
          })
        }
      },
      err => {
        if (onAbort) {
          onAbort(err)
        }
        if (err && !this.ready) {
          this.ready = true
          this.readyErrorCbs.forEach(cb => {
            cb(err)
          })
        }
      }
    )
  }

//可以看到，到这里，已经完成了对当前 route 的更新动作。我们之前已经分析了，在 install函数中设置了对route的数据劫持。此时会触发页面的重新渲染过程。
// router-view 就是根据 this.route来渲染组件的
  updateRoute (route: Route) {
    const prev = this.current
    // 当前路由更新
    this.current = route
    // cb 执行
    this.cb && this.cb(route)
    // 调用 afterEach 钩子
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, prev)
    })
}


//this.current的来源
export const START = createRoute(null, {
  path: '/'
})

this.current = START

// _createRoute 方法
  function _createRoute (
    record: ?RouteRecord,
    location: Location,
    redirectedFrom?: Location
  ): Route {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

// 创建 Route 对象
export function createRoute (
  record: ?RouteRecord,
  location: Location,
  redirectedFrom?: ?Location,
  router?: VueRouter
): Route {
  const stringifyQuery = router && router.options.stringifyQuery

  let query: any = location.query || {}
  try {
    query = clone(query)
  } catch (e) {}

  const route: Route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery)
  }
  return Object.freeze(route)
}
```

### confirmTransition

```js
  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    // 定义中断处理
    const abort = err => {
      // ...
      onAbort && onAbort(err)
    }
   
    // 同路由且 matched.length 相同
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) {
      this.ensureURL()
      return abort()
    }

    const {
      updated,
      deactivated,
      activated
    } = resolveQueue(this.current.matched, route.matched)
    
    // 整个切换周期的队列
    const queue: Array<?NavigationGuard> = [].concat(
      // 得到即将被销毁组建的 beforeRouteLeave 钩子函数
      extractLeaveGuards(deactivated),
      // 全局 router before hooks
      this.router.beforeHooks,
      // 得到组件 updated 钩子
      extractUpdateHooks(updated),
      // 将要更新的路由的 beforeEnter 钩子
      activated.map(m => m.beforeEnter),
      // 异步组件
      resolveAsyncComponents(activated)
    )

    this.pending = route
    // 每一个队列执行的 iterator 函数
    const iterator = (hook: NavigationGuard, next) => {
  // 如果当前处理的路由，已经不等于 route 则终止处理
  if (this.pending !== route) {
    return abort()
  }
  try {
    // hook 是queue 中的钩子函数，在这里执行
    hook(route, current, (to: any) => {
      // 钩子函数外部执行的 next 方法
      // next(false): 中断当前的导航。
      // 如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)
      // 那么 URL 地址会重置到 from 路由对应的地址。
      if (to === false || isError(to)) {
        this.ensureURL(true)
        abort(to)
      } else if (
        // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
        // 当前的导航被中断，然后进行一个新的导航。
        typeof to === 'string' ||
        (typeof to === 'object' && (
          typeof to.path === 'string' ||
          typeof to.name === 'string'
        ))
      ) {
        // next('/') or next({ path: '/' }) -> redirect
        abort()
        if (typeof to === 'object' && to.replace) {
          this.replace(to)
        } else {
          this.push(to)
        }
      } else {
        // 当前钩子执行完成，移交给下一个钩子函数
        // 注意这里的 next 指的是 runQueue 中传过的执行队列下一个方法函数: step(index + 1)
        next(to)
      }
    })
  } catch (e) {
    abort(e)
  }
}

    // 执行队列 leave 和 beforeEnter 相关钩子
    runQueue(queue, iterator, () => {
  const postEnterCbs = []
  const isValid = () => this.current === route
  // 获取 beforeRouteEnter 钩子函数
  const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
  // 获取 beforeResolve 钩子函数 并合并生成另一个 queue
  const queue = enterGuards.concat(this.router.resolveHooks)
  runQueue(queue, iterator, () => {
    // 处理完，就不需要再次执行
    if (this.pending !== route) {
      return abort()
    }
    // 清空
    this.pending = null
    // 调用 onComplete 函数
    onComplete(route)
    if (this.router.app) {
      // nextTick 执行 postEnterCbs 所有回调
      this.router.app.$nextTick(() => {
        postEnterCbs.forEach(cb => { cb() })
      })
    }
  })
})
  }

//可以看出 resolveQueue 就是交叉比对当前路由的路由记录和现在的这个路由的路由记录来确定出哪些组件需要更新，哪些需要激活，哪些组件被卸载。再执行其中的对应钩子函数。
  function resolveQueue (
  current: Array<RouteRecord>,
  next: Array<RouteRecord>
): {
  updated: Array<RouteRecord>,
  activated: Array<RouteRecord>,
  deactivated: Array<RouteRecord>
} {
  let i
  // 取得最大深度
  const max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    // 如果记录不一样则停止
    if (current[i] !== next[i]) {
      break
    }
  }

  // 分别返回哪些需要更新，哪些需要激活，哪些需要卸载
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}
```


监听事件 popState hashChange，该方法设置监听了浏览器事件hashchange,调用的函数为replaceHash,即在浏览器地址栏中直接输入路由相当于代码调用了replace()方法。

在init时，先构建history.transtitionTo方法，再添加 监听事件
```js
window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', () => {
  const current = this.current
  if (!ensureSlash()) {
    return
  }
  this.transitionTo(getHash(), route => {
    if (supportsScroll) {
      handleScroll(this.router, route, current, true)
    }
    if (!supportsPushState) {
      replaceHash(route.fullPath)
    }
  })
})
```

每当 window.location.hash 改变时就会触发 transitionTo方法

### push  replace 方法
transitionTo()方法是用来处理路由变化中的基础逻辑的，

push()方法最主要的是对window的hash进行了直接赋值：
```js
push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(
      location,
      route => {
        pushHash(route.fullPath)
        handleScroll(this.router, route, fromRoute, false)
        onComplete && onComplete(route)
      },
      onAbort
    )
  }

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path))
  } else {
    window.location.hash = path  //直接改变 hash
  }
}

replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(
      location,
      route => {
        replaceHash(route.fullPath)
        handleScroll(this.router, route, fromRoute, false)
        onComplete && onComplete(route)
      },
      onAbort
    )
  }

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path))
  } else {
    window.location.replace(getUrl(path))
  }
}
//Location.replace()方法以给定的URL来替换当前的资源。 与assign() 方法 不同的是调用replace()方法后，当前页面不会保存到会话历史中（session History），这样用户点击回退按钮将不会再跳转到该页面。

  go (n: number) {
    window.history.go(n)
  }
```

## html5 history
HTML5引入了history.pushState()和history.replaceState()方法，他们分别可以添加和修改历史记录条目。这些方法通常与 window.**onpopstate** 配合使用。

```js
window.history.pushState(stateObject,title,url)
window.history,replaceState(stateObject,title,url)
```
pushState和replaceState两种方法的共同特点：当调用他们修改浏览器历史栈后，虽然当前url改变了，但浏览器不会立即发送请求该url，这就为单页应用前端路由，更新视图但不重新请求页面提供了基础。

比较
* pushState设置的新url可以是与当前url同源的任意url,而hash只可修改#后面的部分，故只可设置与当前同文档的url
* pushState设置的新url可以与当前url一模一样，这样也会把记录添加到栈中，而hash设置的新值必须与原来不一样才会触发记录添加到栈中
* pushState通过stateObject可以添加任意类型的数据记录中，而hash只可添加短字符串
* pushState可额外设置title属性供后续使用




## router-link
主要用于生成一个dom，默认为 a 标签，通过 click 事件触发， to 表示要跳转的路由
跳转的处理交给 history 对象

触发的回调函数
```js
const handler = e => {
  if (guardEvent(e)) {
    if (this.replace) { //会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。
      router.replace(location)
    } else {
      router.push(location)
    }
  }
}
```
## router-view

## 导航守卫
### 全局
beforeEach
beforeResolve
afterEach

### 路由独享
beforeEnter

### 组件内
```js
 beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 **next** 的回调函数。

## 触发路由 
1. router-link 触发回调函数，拿到to的值，执行vue-router 的 push方法
2. 执行 transitionTo 方法, 修改路由路径， vm._route 
3. 触发 _route 的数据响应，使 router-view 重新渲染
4. router-view 从 vm.$route.matched 表示路由路径上的全部 RouteRecord
5. 根据组件的深度(是否有父 router-view)，获取当前 view-router 需要渲染的 组件，生成vnode并返回


## 两种方式
### hash
window.location.hash

1. 点击事件改变当前url
2. 通过hashChange事件来监听url的变化来更新组件

### html5 history

window.history

1. 点击事件触发回调，通过 pushState,replaceState 来改变url，并调用相应的更新