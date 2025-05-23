///
/// NitroGzipAutolinking.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

public final class NitroGzipAutolinking {
  public typealias bridge = margelo.nitro.nitrogzip.bridge.swift

  /**
   * Creates an instance of a Swift class that implements `HybridNitroGzipSpec`,
   * and wraps it in a Swift class that can directly interop with C++ (`HybridNitroGzipSpec_cxx`)
   *
   * This is generated by Nitrogen and will initialize the class specified
   * in the `"autolinking"` property of `nitro.json` (in this case, `NitroGzip`).
   */
  public static func createNitroGzip() -> bridge.std__shared_ptr_margelo__nitro__nitrogzip__HybridNitroGzipSpec_ {
    let hybridObject = NitroGzip()
    return { () -> bridge.std__shared_ptr_margelo__nitro__nitrogzip__HybridNitroGzipSpec_ in
      let __cxxWrapped = hybridObject.getCxxWrapper()
      return __cxxWrapped.getCxxPart()
    }()
  }
}
