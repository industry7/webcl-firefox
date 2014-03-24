/*
 * This file is part of WebCL – Web Computing Language.
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 *
 * The Original Contributor of this Source Code Form is
 * Nokia Research Center Tampere (http://webcl.nokiaresearch.com).
 *
 */

var EXPORTED_SYMBOLS = [ "WebCLCommandQueue" ];


try {

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

var Exception = Components.Exception;


Cu.import ("resource://gre/modules/Services.jsm");
Cu.import ("resource://gre/modules/XPCOMUtils.jsm");
Cu.import ("resource://nrcwebcl/modules/logger.jsm");
Cu.import ("resource://nrcwebcl/modules/webclutils.jsm");
Cu.import ("resource://nrcwebcl/modules/common.jsm");
Cu.import ("resource://nrcwebcl/modules/base.jsm");

Cu.import ("resource://nrcwebcl/modules/mixin.jsm");

Cu.import ("resource://nrcwebcl/modules/lib_ocl/ocl_constants.jsm");
Cu.import ("resource://nrcwebcl/modules/lib_ocl/ocl_exception.jsm");

Cu.import ("resource://nrcwebcl/modules/webclclasses.jsm");


function WebCLCommandQueue ()
{
  TRACE (this, "WebCLCommandQueue", arguments);
  try {
    if (!(this instanceof WebCLCommandQueue)) return new WebCLCommandQueue ();

    Base.apply(this);

    this.wrappedJSObject = this;

    this.__exposedProps__ =
    {
      getExternalIdentity: "r",
      enqueueCopyBuffer: "r",
      enqueueCopyBufferRect: "r",
      enqueueCopyImage: "r",
      enqueueCopyImageToBuffer: "r",
      enqueueCopyBufferToImage: "r",
      enqueueReadBuffer: "r",
      enqueueReadBufferRect: "r",
      enqueueReadImage: "r",
      enqueueWriteBuffer: "r",
      enqueueWriteBufferRect: "r",
      enqueueWriteImage: "r",
      enqueueNDRangeKernel: "r",
      enqueueMarker: "r",
      enqueueBarrier: "r",
      enqueueWaitForEvents: "r",
      finish: "r",
      flush: "r",
      getInfo: "r",
      release: "r",

      classDescription: "r"
    };
  }
  catch (e)
  {
    ERROR ("webclcommandqueue.jsm:WebCLCommandQueue failed: " + e);
    throw webclutils.convertCLException (e);
  }
}

WEBCLCLASSES.WebCLCommandQueue = WebCLCommandQueue;
WebCLCommandQueue.prototype = Object.create (Base.prototype);
WebCLCommandQueue.prototype.classDescription = "WebCLCommandQueue";




WebCLCommandQueue.prototype.enqueueCopyBuffer = function (srcBuffer, dstBuffer,
                                                          srcOffset, dstOffset, numBytes,
                                                          eventWaitList, eventOut)
{
  TRACE (this, "enqueueCopyBuffer", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(srcBuffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "srcBuffer must be a valid WebCLBuffer object; was " + srcBuffer, null);

    if (!webclutils.validateBuffer(dstBuffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "dstBuffer must be a valid WebCLBuffer object; was " + dstBuffer, null);

    var clSrcBuffer = this._unwrapInternalOrNull (srcBuffer);
    var clDstBuffer = this._unwrapInternalOrNull (dstBuffer);

    if (!webclutils.validateNumber (srcOffset))  throw new CLInvalidArgument ("srcOffset");
    if (!webclutils.validateNumber (dstOffset))  throw new CLInvalidArgument ("dstOffset");
    if (!webclutils.validateNumber (numBytes))  throw new CLInvalidArgument ("numBytes");

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueCopyBuffer (clSrcBuffer, clDstBuffer,
                                               srcOffset, dstOffset, numBytes,
                                               clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueCopyBufferRect = function (srcBuffer, dstBuffer,
                                                              srcOrigin, dstOrigin, region,
                                                              srcRowPitch, srcSlicePitch,
                                                              dstRowPitch, dstSlicePitch,
                                                              eventWaitList, eventOut)
{
  TRACE (this, "enqueueCopyBufferRect", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(srcBuffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "srcBuffer must be a valid WebCLBuffer object; was " + srcBuffer, null);

    if (!webclutils.validateBuffer(dstBuffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "dstBuffer must be a valid WebCLBuffer object; was " + dstBuffer, null);

    var clSrcBuffer = this._unwrapInternalOrNull (srcBuffer);
    var clDstBuffer = this._unwrapInternalOrNull (dstBuffer);

    if (!webclutils.validateArrayLength(srcOrigin, function(arr) { return arr.length === 3; }))
      throw new CLInvalidArgument ("srcOrigin");
    if (!webclutils.validateArrayLength(dstOrigin, function(arr) { return arr.length === 3; }))
      throw new CLInvalidArgument ("dstOrigin");
    if (!webclutils.validateArrayLength(region, function(arr) { return arr.length === 3; }))
      throw new CLInvalidArgument ("region");

    if (!webclutils.validateNumber (srcRowPitch))  throw new CLInvalidArgument ("srcRowPitch");
    if (!webclutils.validateNumber (srcSlicePitch))  throw new CLInvalidArgument ("srcSlicePitch");
    if (!webclutils.validateNumber (dstRowPitch))  throw new CLInvalidArgument ("dstRowPitch");
    if (!webclutils.validateNumber (dstSlicePitch))  throw new CLInvalidArgument ("dstSlicePitch");

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueCopyBufferRect (clSrcBuffer, clDstBuffer,
                                                   srcOrigin, dstOrigin, region,
                                                   srcRowPitch, srcSlicePitch,
                                                   dstRowPitch, dstSlicePitch,
                                                   clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueCopyImage = function (srcImage, dstImage,
                                                         srcOrigin, dstOrigin,
                                                         region,
                                                         eventWaitList, eventOut)
{
  TRACE (this, "enqueueCopyImage", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateImage(srcImage))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "srcImage must be a valid WebCLImage object; was " + srcImage, null);

    if (!webclutils.validateImage(dstImage))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "dstImage must be a valid WebCLImage object; was " + dstImage, null);

    var clSrcImage = this._unwrapInternalOrNull (srcImage);
    var clDstImage = this._unwrapInternalOrNull (dstImage);

    // TODO: validate srcOrigin, dstOrigin, region

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueCopyImage (clSrcImage, clDstImage,
                                              srcOrigin, dstOrigin, region,
                                              clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueCopyImageToBuffer = function (srcImage, dstBuffer,
                                                                 srcOrigin, srcRegion, dstOffset,
                                                                 eventWaitList, eventOut)
{
  TRACE (this, "enqueueCopyImageToBuffer", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateImage(srcImage))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "srcImage must be a valid WebCLImage object; was " + srcImage, null);

    if (!webclutils.validateBuffer(dstBuffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "dstBuffer must be a valid WebCLBuffer object; was " + dstBuffer, null);

    var clSrcImage = this._unwrapInternalOrNull (srcImage);
    var clDstBuffer = this._unwrapInternalOrNull (dstBuffer);

    // TODO: validate srcOrigin, srcRegion, dstOffset

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueCopyImageToBuffer (clSrcImage, clDstBuffer,
                                                      srcOrigin, srcRegion, dstOffset,
                                                      clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
}


WebCLCommandQueue.prototype.enqueueCopyBufferToImage = function (srcBuffer, dstImage,
                                                                 srcOffset, dstOrigin, dstRegion,
                                                                 eventWaitList, eventOut)
{
  TRACE (this, "enqueueCopyBufferToImage", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(srcBuffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "srcBuffer must be a valid WebCLBuffer object; was " + srcBuffer, null);

    if (!webclutils.validateImage(dstImage))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "dstImage must be a valid WebCLImage object; was " + dstImage, null);

    var clSrcBuffer = this._unwrapInternalOrNull (srcBuffer);
    var clDstImage = this._unwrapInternalOrNull (dstImage);

    // TODO: validate srcOffset, dstOrigin, region

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueCopyBufferToImage (clSrcBuffer, clDstImage,
                                                      srcOffset, dstOrigin, region,
                                                      clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueReadBuffer = function (buffer, blockingRead,
                                                          bufferOffset, numBytes, hostPtr,
                                                          eventWaitList, eventOut)
{
  TRACE (this, "enqueueReadBuffer", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(buffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "buffer must be a valid WebCLBuffer object; was " + buffer, null);

    if (!webclutils.validateBoolean(blockingRead))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'blockingRead' must be a boolean; was " + blockingRead);

    var clBuffer = this._unwrapInternalOrNull (buffer);

    if (!webclutils.validateNumber(bufferOffset))
      throw new CLInvalidArgument ("bufferOffset");
    if (!webclutils.validateNumber(numBytes))
      throw new CLInvalidArgument ("numBytes");

    // TODO: validate hostPtr

    var clEventWaitList = [];
    if (eventWaitList) clEventWaitList = this._convertEventWaitList (eventWaitList);

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueReadBuffer (clBuffer, !!blockingRead,
                                              bufferOffset,
                                              numBytes, hostPtr,
                                              clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueReadBufferRect = function (buffer, blockingRead,
                                                              bufferOrigin, hostOrigin, region,
                                                              bufferRowPitch, bufferSlicePitch,
                                                              hostRowPitch, hostSlicePitch,
                                                              hostPtr,
                                                              eventWaitList, eventOut)
{
  TRACE (this, "enqueueReadBufferRect", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(buffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "buffer must be a valid WebCLBuffer object; was " + buffer, null);

    if (!webclutils.validateBoolean(blockingRead))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'blockingRead' must be a boolean; was " + blockingRead);

    var clBuffer = this._unwrapInternalOrNull (buffer);

    // TODO: validate bufferOrigin, hostOrigin, region, bufferRowPitch, bufferSlicePitch,
    //       hostRowPitch, hostSlicePitch, hostPtr

    var clEventWaitList = [];
    if (eventWaitList) clEventWaitList = this._convertEventWaitList (eventWaitList);

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueReadBufferRect (clBuffer, !!blockingRead,
                                                  bufferOrigin, hostOrigin, region,
                                                  bufferRowPitch, bufferSlicePitch,
                                                  hostRowPitch, hostSlicePitch,
                                                  hostPtr,
                                                  clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueReadImage = function (image, blockingRead,
                                                         origin, region, hostRowPitch,
                                                         hostPtr, eventWaitList, eventOut)
{
  TRACE (this, "enqueueReadImage", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    /*
    INVALID_OPERATION -- if the blocking form of this function is called from a WebCLCallback
  x INVALID_CONTEXT -- if this WebCLCommandQueue is not associated with the same WebCLContext as image
    INVALID_CONTEXT -- if this WebCLCommandQueue is not associated with the same WebCLContext as all events in eventWaitList
  x INVALID_MEM_OBJECT -- if image is not a valid WebCLImage object
    INVALID_IMAGE_SIZE -- if the image dimensions of image are not supported by this WebCLCommandQueue
  x INVALID_VALUE -- if origin or region does not have exactly two elements
    INVALID_VALUE -- if any part of the region being read, specified by origin and region, is out of bounds of image
  x INVALID_VALUE -- if any part of the region being written, specified by region and hostRowPitch, is out of bounds of hostPtr
  x INVALID_VALUE -- if hostRowPitch % hostPtr.BYTES_PER_ELEMENT !== 0
    INVALID_EVENT_WAIT_LIST -- if any event in eventWaitList is invalid
    INVALID_EVENT_WAIT_LIST -- if blockingRead is true, and any event in eventWaitList is a WebCLUserEvent or a newly created (non-activated) WebCLEvent
    EXEC_STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST -- if blockingRead is true and the execution status of any event in eventWaitList
      is a negative integer value
    INVALID_EVENT -- if event is not a newly created empty WebCLEvent
    */

    if (!webclutils.validateImage(image))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "'image' must be a valid WebCLImage object; was " + image);

    if (this.getInfo(ocl_info.CL_QUEUE_CONTEXT) !== image.getInfo(ocl_info.CL_MEM_CONTEXT))
      throw new CLError(ocl_errors.CL_INVALID_CONTEXT, "'image' and this WebCLCommandQueue must have the same WebCLContext");

    if (!webclutils.validateBoolean(blockingRead))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'blockingRead' must be a boolean; was " + blockingRead);

    if (!webclutils.validateArrayLength(origin, function(arr) { return arr.length === 2; }))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'origin' must be an Array with exactly two elements; was " + origin);

    if (!webclutils.validateArrayLength(region, function(arr) { return arr.length === 2; }))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'region' must be an Array with exactly two elements; was " + region);

    if (!webclutils.validateArray(origin, webclutils.validateNumber))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'origin' must be an Array with elements of type 'number'");

    if (!webclutils.validateArray(region, webclutils.validateNumber))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'region' must be an Array with elements of type 'number'");

    if (!webclutils.validateArray(origin, function(v) { return v >= 0; }))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "all elements of 'origin' must be non-negative");

    if (!webclutils.validateArray(region, function(v) { return v >= 0; }))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "all elements of 'region' must be non-negative");

    if (!(webclutils.validateNumber(hostRowPitch) && ((hostRowPitch & 0x80000000) === 0)))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'hostRowPitch' must be non-negative and less than 2^31");

    if (!webclutils.validateArrayBufferView(hostPtr))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'hostPtr' must be an instance of ArrayBufferView, was " + hostPtr);

    if (hostRowPitch !== 0 && hostRowPitch % hostPtr.BYTES_PER_ELEMENT !== 0)
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'hostRowPitch' must be zero or a multiple of hostPtr.BYTES_PER_ELEMENT");

    if (hostRowPitch !== 0 && hostRowPitch*region[1] > hostPtr.byteLength)
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "region", "hostRowPitch * region[1] must not be greater than hostPtr.byteLength");

    var descriptor = image.getInfo();
    var width = descriptor.width;
    var height = descriptor.height;
    var rowPitch = descriptor.rowPitch;
    var numChannels = webclutils.getNumChannels(descriptor);

    if (origin[0] + region[0] > width || origin[1] + region[1] > height)
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "area specified by 'origin' and 'region' must fit inside image");

    if (hostRowPitch !== 0 && hostRowPitch < rowPitch)
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'hostRowPitch' must not be less than image.getInfo().rowPitch");

    if (hostRowPitch === 0 && region[0]*region[1]*numChannels > hostPtr.length)
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "region[0] * region[1] * numChannels must not be greater than hostPtr.length");

    // TODO validate eventWaitList

    var clEventWaitList = [];
    if (eventWaitList) clEventWaitList = this._convertEventWaitList (eventWaitList);

    this._validateEventOut (eventOut);

    var clImage = this._unwrapInternalOrNull (image);
    var clOrigin = [ origin[0], origin[1], 0 ];
    var clRegion = [ region[0], region[1], 1 ];
    var ev = this._internal.enqueueReadImage (clImage, !!blockingRead,
                                              clOrigin, clRegion,
                                              hostRowPitch, 0,
                                              hostPtr,
                                              clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueWriteBuffer = function (buffer, blockingWrite,
                                                           bufferOffset, numBytes, hostPtr,
                                                           eventWaitList, eventOut)
{
  TRACE (this, "enqueueWriteBuffer", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(buffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "buffer must be a valid WebCLBuffer object; was " + buffer, null);

    if (!webclutils.validateBoolean(blockingWrite))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'blockingWrite' must be a boolean; was " + blockingWrite);

    var clBuffer = this._unwrapInternalOrNull (buffer);

    if (!webclutils.validateNumber(bufferOffset))
      throw new CLInvalidArgument ("bufferOffset");
    if (!webclutils.validateNumber(numBytes))
      throw new CLInvalidArgument ("numBytes");

    // TODO: validate hostPtr

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueWriteBuffer (clBuffer, !!blockingWrite,
                                                bufferOffset,
                                                numBytes, hostPtr,
                                                clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueWriteBufferRect = function (buffer, blockingWrite,
                                                               bufferOrigin, hostOrigin, region,
                                                               bufferRowPitch, bufferSlicePitch,
                                                               hostRowPitch, hostSlicePitch,
                                                               hostPtr,
                                                               eventWaitList, eventOut)
{
  TRACE (this, "enqueueWriteBufferRect", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateBuffer(buffer))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "buffer must be a valid WebCLBuffer object; was " + buffer, null);

    if (!webclutils.validateBoolean(blockingWrite))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'blockingWrite' must be a boolean; was " + blockingWrite);

    var clBuffer = this._unwrapInternalOrNull (buffer);

    // TODO: validate bufferOrigin, hostOrigin, region, bufferRowPitch, bufferSlicePitch,
    //       hostRowPitch, hostSlicePitch, hostPtr

    var clEventWaitList = [];
    if (eventWaitList) clEventWaitList = this._convertEventWaitList (eventWaitList);

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueWriteBufferRect (clBuffer, !!blockingWrite,
                                                    bufferOrigin, hostOrigin, region,
                                                    bufferRowPitch, bufferSlicePitch,
                                                    hostRowPitch, hostSlicePitch,
                                                    hostPtr,
                                                    clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueWriteImage = function (image, blockingWrite,
                                                          origin, region, hostRowPitch,
                                                          hostPtr, eventWaitList, eventOut)
{
  TRACE (this, "enqueueWriteImage", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateImage(image))
      throw new CLError(ocl_errors.CL_INVALID_MEM_OBJECT, "image must be a valid WebCLImage object; was " + image, null);

    if (!webclutils.validateBoolean(blockingWrite))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'blockingWrite' must be a boolean; was " + blockingWrite);

    var clImage = this._unwrapInternalOrNull (image);

    // TODO: validate origin, region, hostRowPitch, hostPtr

    var clEventWaitList = [];
    if (eventWaitList) clEventWaitList = this._convertEventWaitList (eventWaitList);

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueWriteImage (clImage, !!blockingWrite,
                                               origin, region,
                                               hostRowPitch, 0,
                                               hostPtr,
                                               clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueNDRangeKernel = function (kernel, workDim, globalWorkOffset,
                                                             globalWorkSize, localWorkSize,
                                                             eventWaitList, eventOut)
{
  TRACE (this, "enqueueNDRangeKernel", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    var clKernel = this._unwrapInternalOrNull (kernel);
    if (!webclutils.validateKernel(clKernel))
      throw new CLInvalidArgument ("kernel");
    if (!webclutils.validateNumber(workDim) || workDim  < 1 || workDim > 3)
      throw new CLInvalidArgument ("workDim");
    if (globalWorkOffset && !webclutils.validateArray(globalWorkOffset, webclutils.validateNumber))
      throw new CLInvalidArgument ("globalWorkOffset");
    if (!webclutils.validateArray(globalWorkSize, webclutils.validateNumber))
      throw new CLInvalidArgument ("globalWorkSize");
    if (localWorkSize && !webclutils.validateArray(localWorkSize, webclutils.validateNumber))
      throw new CLInvalidArgument ("localWorkSize");

    var clEventWaitList = [];
    if (eventWaitList)
    {
      clEventWaitList = this._convertEventWaitList (eventWaitList);
    }

    this._validateEventOut (eventOut);

    var ev = this._internal.enqueueNDRangeKernel (clKernel, workDim,
                                                  globalWorkOffset, globalWorkSize, localWorkSize,
                                                  clEventWaitList);
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueMarker = function (eventOut)
{
  TRACE (this, "enqueueMarker", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    this._validateEventOut (eventOut);
    var ev = this._internal.enqueueMarker ();
    this._handleEventOut (ev, eventOut);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueBarrier = function ()
{
  TRACE (this, "enqueueBarrier", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    this._internal.enqueueBarrier ();
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.enqueueWaitForEvents = function (eventWaitList)
{
  TRACE (this, "enqueueWaitForEvents", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!Array.isArray(eventWaitList))
    {
      throw new CLInvalidArgument ("eventWaitList.");
    }

    var clEvents = this._convertEventWaitList (eventWaitList);
    this._internal.enqueueWaitForEvents (clEvents);
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.finish = function ()
{
  TRACE (this, "finish", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    this._internal.finish ();
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.flush = function ()
{
  TRACE (this, "flush", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    this._internal.flush ();
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};


WebCLCommandQueue.prototype.getInfo = function (name)
{
  TRACE (this, "getInfo", arguments);
  if(!this._ensureValidObject ()) throw new CLInvalidated();

  try
  {
    if (!webclutils.validateNumber(name))
      throw new CLError(ocl_errors.CL_INVALID_VALUE, "'name' must be a valid CLenum; was " + name, "WebCLCommandQueue.getInfo");

    switch (name)
    {
    case ocl_info.CL_QUEUE_CONTEXT:
    case ocl_info.CL_QUEUE_DEVICE:
    case ocl_info.CL_QUEUE_PROPERTIES:
      var clInfoItem = this._internal.getInfo (name);
      return this._wrapInternal (clInfoItem);
    default:
      throw new CLError (ocl_errors.CL_INVALID_VALUE, "Unrecognized enum " + name, "WebCLCommandQueue.getInfo");
    }
  }
  catch (e)
  {
    try { ERROR(String(e)); }catch(e){}
    throw webclutils.convertCLException (e);
  }
};



//------------------------------------------------------------------------------
// Internal functions


WebCLCommandQueue.prototype._validateEventOut = function (eventOut)
{
  TRACE (this, "_validateEventOut", arguments);
  if (eventOut === undefined) eventOut = null;
  if (eventOut !== null && !webclutils.validateEvent(eventOut))
    throw new CLError(ocl_errors.CL_INVALID_EVENT, "'event' must be a newly created empty WebCLEvent; was " + eventOut);

  if (eventOut !== null && !webclutils.validateEventNotReleased(eventOut))
    throw new CLError(ocl_errors.CL_INVALID_EVENT, "'event' must be a newly created empty WebCLEvent; was already released");

  if (eventOut !== null && !webclutils.validateEventEmpty(eventOut))
    throw new CLError(ocl_errors.CL_INVALID_EVENT, "'event' must be a newly created empty WebCLEvent; was already populated");
}


WebCLCommandQueue.prototype._handleEventOut = function (clEvent, webclEvent)
{
  TRACE (this, "_handleEventOut", arguments);
  if (!clEvent) return;

  if (webclEvent)
  {
    var unwrappedEvent = webclEvent.wrappedJSObject;
    unwrappedEvent._internal = clEvent;
    unwrappedEvent._identity = clEvent.getIdentity();
    this._owner._registerObject (webclEvent);
  }
  else
  {
    // Internal event must be released if it's not going to being used.
    clEvent.release ();
  }
};


WebCLCommandQueue.prototype._convertEventWaitList = function (eventWaitList)
{
  TRACE (this, "_convertEventWaitList", arguments);
  var clEvents = [];
  for (var i = 0; i < eventWaitList.length; ++i)
  {
    var p = this._unwrapInternalOrNull (eventWaitList[i]);
    if (!webclutils.validateEventPopulated (p))
    {
      // TODO: handle errors better...
      throw new CLInvalidArgument ("eventWaitList[" + i + "].");
    }
    clEvents.push (p);
  }

  return clEvents;
}


} catch(e) { ERROR ("webclcommandqueue.jsm: "+e); }